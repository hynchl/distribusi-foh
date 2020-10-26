CODE_TYPES = ['x-c', 'x-shellscript', 'x-python']

FILE_TYPES = {
    'image': '<figure><img class="image" src="{}"><figcaption>{}</figcaption></figure>',
    'text': '<a href="{}" class="text">{}</a>',
    'video': ('<video controls>' '<source src="{}"></video>'),
    'audio': ('<audio controls class="audio">' '<source src="{}"></audio>'),
}

SUB_TYPES = {
        'pdf': (
            '<object data="{}" class="pdf" type="application/pdf">'
            '<embed src="{}" type="application/pdf" /></object>')
}
