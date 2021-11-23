# -*- coding: utf-8 -*- 

import base64
import os
import subprocess

from io import BytesIO

import magic
from PIL import Image, ExifTags
import markdown

from distribusi.page_template import html_footer, html_head
from distribusi.page_template_event import html_footer_event, html_head_event
from distribusi.mappings import CODE_TYPES, FILE_TYPES, SUB_TYPES
from distribusi import fragments
import uuid
from distribusi.ignore import Ignore

import traceback

MIME_TYPE = magic.Magic(mime=True)

ignore = Ignore()


def caption(image):
    try:
        process = subprocess.Popen(
            ['exiftool', '-Comment', image], stdout=subprocess.PIPE)
        out, err = process.communicate()
    except Exception as e:
        print(e)
        print('Do you have exiftool installed?')
    try:
        caption = out.decode("utf-8").split(": ", 1)[1]
    except Exception as e:
        caption = ''
        print(e)

    return caption


def thumbnail(image, name, args):
    try:
        size = (450, 450)
        im = Image.open(image)
        exif = None
        try:
            for orientation in ExifTags.TAGS.keys():
                if ExifTags.TAGS[orientation] == 'Orientation':
                    break
            exif = im._getexif()
        except (AttributeError, KeyError, IndexError):
            pass

        im.thumbnail(size)

        if exif is not None:
            if exif[orientation] == 3:
                im = im.rotate(180, expand=True)
            elif exif[orientation] == 6:
                im = im.rotate(270, expand=True)
            elif exif[orientation] == 8:
                im = im.rotate(90, expand=True)
        
        if (im.mode == 'RGBA'):
            bg = Image.new('RGBA', im.size, (255,255,255))
            composite = Image.alpha_composite(bg, im)
            im=composite.convert('RGB')
        
        output = BytesIO()
        im.save(output, format='JPEG')
        im_data = output.getvalue()
        data_url = base64.b64encode(im_data).decode()
        if args.captions:
            cap = caption(image)
        else:
            cap = name
        return (
            "<figure><a href='{}'><img class='thumbnail' src='data:image/jpg;base64,{}'></a><figcaption>{}</figcaption></figure>"
        ).format(name, data_url, cap)
    except Exception as e:
        traceback.print_exc()
        print('Thumbnailer:', e)
        return "<figure><a href='{}'><img src='{}'></a><figcaption>{}</figcaption></figure>".format(name, name, name)


def div(args, type_, subtype, tag, name, fid):
    '''
    fid: fragment_id
    '''
    if args.no_filenames:
        filename = ''
    else:
        filename = '<span class="filename">{}</span>'.format(name)

    if len(str(fid)) >= 36 or int(fid) < 0: # detect if fid is uuid
        if 'image' in type_:
            html = '<div class="{}">{}</div>'
        elif 'pdf' in subtype:
            html = '<div class="{}">{}' + filename + '</div>'
        elif 'dir' in type_ or 'html' in subtype or 'unkown-file' in subtype:
            html = '<div class="{}">{}</div>'
        else:
            html = '<div class="{}">{}' + filename + '</div>'
        html = html.format(subtype, tag)
    else:
        if 'image' in type_:
            html = '<div class="{}"><a class="anchor" id="{}"></a>{}<span class="fid">#{}</span></div>'
        elif 'pdf' in subtype:
            html = '<div class="{}"><a class="anchor" id="{}"></a>{}' + filename + '<span class="fid">#{}</span></div>'
        elif 'dir' in type_ or 'html' in subtype or 'unkown-file' in subtype:
            html = '<div class="{}"><a class="anchor" id="{}"></a>{}<span class="fid">#{}</span></div>'
        else:
            html = '<div class="{}"><a class="anchor" id="{}"></a>{}' + filename + '<span class="fid">#{}</span></div>'
        html = html.format(subtype, fid, tag, fid)
    return html


def check_distribusi_index(args, index):
    """
    check whether a index.html file is generated by distribusi
    """

    if not args.force:
        with open(index, 'r') as f:
            if '<meta name="generator" content="distribusi" />' in f.read():
                return True
            else:
                if args.verbose:
                    print(index, 'not generated by distribusi, skipping')
                return False
    elif args.force:
        return True


def write_index(args, index, html, html_head, html_footer):
    with open(index, 'w') as f:
        if not args.no_template:
            if args.style:
                fs = open(args.style, "r")
                style = fs.read()
                styled_html_head = html_head # % style
            else:
                styled_html_head = html_head % ''
                print("---")
            f.write(styled_html_head)

        for line in html:
            f.write(line + '\n')

        if not args.no_template:
            f.write(html_footer)


def render_dir(args, directory):
    html = []
    print(directory)

    for root, dirs, files in os.walk(directory):
        for name in sorted(files):
            lv = root.split("/")
            relative = lv[len(lv) - 1]
            relative_path = "./{}/{}".format(relative, name)

            if ignore.test(name):
                pass
            elif 'index.html' not in name:
                full_path = os.path.join(root, name)
                mime = MIME_TYPE.from_file(full_path)
                # example: MIME plain/text becomes 'type' plain 'subtype' text
                type_, subtype = mime.split('/')

                c = name

                if args.verbose:
                    print('Found file in dir ', name, 'as', mime)

                if type_ in FILE_TYPES:
                    a = FILE_TYPES[type_].format(relative_path, c, c)

                    # expansion for different kind of text files
                    if type_ == 'text':
                        if name.endswith('.html') or subtype == 'html':
                            subtype = 'html'
                            # what types of text files to expand
                            a = '<section id="{}">{}</section>'.format(name, open(full_path).read())
                        elif subtype in CODE_TYPES or name.endswith('.txt'):
                            # if the plain text is code,
                            # which types do we wrap in pre-tags?
                            a = "<div>" + open(full_path).read() + "</div>"
                        elif subtype == 'markdown' or name.endswith('.md'):
                            a = "<div>" + markdown.markdown(open(full_path).read()) + "</div>"
                            pass
                        else:
                            subtype = subtype + ' unkown-file'
                            a = "<a href='{}'>{}</a>"
                            # a = FILE_TYPES[type_]

                    if type_ == 'image':
                        a = FILE_TYPES[type_].format(relative_path, c, c)
                        if args.thumbnail:
                            a = thumbnail(full_path, relative_path, args)
                        if args.no_filenames:
                            c = ""
                        if args.captions:
                            c = caption(relative_path)
                            a = FILE_TYPES[type_].format(relative_path, c, c)
                        # ALT 처리
                        alt_path = full_path + ".alt"
                        if os.path.isfile(alt_path):
                            f = open(alt_path, 'r', encoding='utf-8')
                            alt = ''
                            while True:
                                line = f.readline()
                                if not line: break
                                alt = alt + line + ' '

                            a = FILE_TYPES[type_].format(relative_path, alt, c)

                if subtype in SUB_TYPES:
                    a = SUB_TYPES[subtype]

                if type_ not in FILE_TYPES and subtype not in SUB_TYPES:
                    # catch exceptions not yet defined in FILE_TYPES or SUB_TYPES
                    a = "<a href='{}'>{}</a>"
                    if args.verbose:
                        message = 'not in list of file types, adding as plain href: \n'
                        print(type_, subtype, message, name)
                        subtype = subtype + ' unkown-file'

                a = a.replace('{}', relative_path)
                id = uuid.uuid1()
                html.append(div(args, type_, subtype, a, name, id))
    result = ""
    for line in html:
        result += line + "\n"
    return result


def distribusify(args, directory, freg):  # noqa
    for root, dirs, files in os.walk(directory):
        ignore.add(root)
        if ignore.testRoot(root):
            continue

        if args.exclude_directory:
            if args.verbose:
                print('Excluding directory:', ", ".join(args.exclude_directory))
            dirs[:] = [d for d in dirs if d not in args.exclude_directory]

        if args.no_hidden:
            dirs = list(filter(lambda d: not d.startswith('.'), dirs))
            files = list(filter(lambda f: not f.startswith('.'), files))

        dirs.sort()
        files.sort()

        #
        # fragments index
        # 작가 폴더 내인 경우 아티스트명 저장
        #
        artist = None
        path = root.split('/')
        if len(path) > 2:
            artist = path[2].strip()

        print(path)
        print(artist)

        if not args.remove_index:
            html = []

            if args.verbose:
                print('Generating directory listing for', root)

            for name in sorted(files):
                if ignore.test(name):
                    print("Ignore : " + name)
                elif 'index.html' not in name:
                    full_path = os.path.join(root, name)
                    mime = MIME_TYPE.from_file(full_path)
                    # example: MIME plain/text becomes 'type' plain 'subtype' text
                    type_, subtype = mime.split('/')

                    c = name

                    if args.verbose:
                        print('Found', name, 'as', mime)

                    if type_ in FILE_TYPES:
                        
                        a = FILE_TYPES[type_].format(name, c, c)

                        # expansion for different kind of text files
                        if type_ == 'text':
                            if name.endswith('.html') or subtype == 'html':
                                subtype = 'html'
                                # what types of text files to expand
                                a = '<section id="{}">{}</section>'.format(name, open(full_path).read())
                            elif subtype in CODE_TYPES or name.endswith('.txt'):
                                # if the plain text is code,
                                # which types do we wrap in pre-tags?
                                a = "<div>" + open(full_path).read() + "</div>"
                            elif subtype == 'markdown' or name.endswith('.md'):
                                a = "<div>" + markdown.markdown(open(full_path).read()) + "</div>"
                                pass
                            else:
                                subtype = subtype+' unkown-file'
                                a = "<a href='{}'>{}</a>"
                                # a = FILE_TYPES[type_]

                        if type_ == 'image':
                            if args.thumbnail:
                                a = thumbnail(full_path, name, args)
                            if args.no_filenames:
                                c = ""
                            if args.captions:
                                c = caption(full_path)
                                a = FILE_TYPES[type_].format(name, c, c)
                            # ALT 처리
                            alt_path = full_path + ".alt"
                            if os.path.isfile(alt_path):
                                f = open(alt_path, 'r', encoding='utf-8')
                                alt = ''
                                while True:
                                    line = f.readline()
                                    if not line: break
                                    alt = alt + line + ' '

                                a = FILE_TYPES[type_].format(name, alt, c)

                    if subtype in SUB_TYPES:
                        a = SUB_TYPES[subtype]

                    if type_ not in FILE_TYPES and subtype not in SUB_TYPES:
                        # catch exceptions not yet defined in FILE_TYPES or SUB_TYPES
                        a = "<a href='{}'>{}</a>"
                        if args.verbose:
                            message = 'not in list of file types, adding as plain href: \n'
                            print(type_, subtype, message, name)
                            subtype = subtype + ' unkown-file'

                    a = a.replace('{}', name)
                    if (len(path) == 3 and artist) or (len(path) == 4 and artist == "events"):
                        fid = freg.get_index(artist, name)
                        html.append(div(args, type_, subtype, a, name, fid))

            if root != directory:
                if args.menu_with_index:
                    html.append('<a href="../index.html">../</a>')
                else:
                    html.append('<a href="../">../</a>')

            for name in dirs:
                if ignore.test(name):
                    pass
                elif (len(path) == 3 and artist) or (len(path) == 4 and artist == "events"):
                    # dirs 내부의 콘텐츠를 렌더링해 가져와야 함
                    fid = freg.get_index(artist, name)
                    rd = render_dir(args, "{}/{}".format(root, name))
                    # h = '<div id="{}">\n{}</div>'
                    h = '<div class="folder"><a class="anchor" id="{}"></a>\n{}<span class="fid">#{}</span></div>'.format(fid, rd, fid)
                    html.append(h)

            if not directory == root:
                index = os.path.join(root, 'index.html')
                if os.path.exists(index):
                    if check_distribusi_index(args, index):
                        if artist == "events":
                            write_index(args, index, html, html_head_event, html_footer_event)
                        else:
                            write_index(args, index, html, html_head, html_footer)
                elif not os.path.exists(index):
                    if artist == "events":
                        write_index(args, index, html, html_head_event, html_footer_event)
                    else:
                        write_index(args, index, html, html_head, html_footer)

        if args.remove_index:
            index = os.path.join(root, 'index.html')
            if 'index.html' in files:
                try:
                    if check_distribusi_index(args, index):
                        if args.verbose:
                            print('Removing index.html from', root)
                        os.remove(index)
                except Exception as e:
                    print(e)
