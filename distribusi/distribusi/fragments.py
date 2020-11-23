import os
import platform
import json
from operator import itemgetter


class Fragment:
    def __init__(self, index, update, directory, artist, file):
        self.index = index
        self.update = update
        self.directory = directory
        self.artist = artist
        self.file = file

    def __repr__(self):
        return repr((self.index, self.update, self.directory, self.artist, self.file))


class Fragments:
    def __init__(self):
        self.json_data = {}
        self.index = {}
        self.indextable = []
        self.timetable = []
        self.ignore = ['.ignore']

        self.ignore_file = '.ignore'
        self.index_file = 'index.json'

    def init_json(self, directory):
        self.index_path = index_path = os.path.join(directory, self.index_file)
        if os.path.isfile(self.index_path):
            with open(self.index_path) as json_file:
                self.json_data = json.load(json_file)

        self.temp_data = {"fragments":[]}
        self.count = len(self.json_data)

    def add_ignore(self, directory):
        ignore_path = os.path.join(directory, self.ignore_file)
        if os.path.isfile(ignore_path):
            ignore = open(ignore_path, 'r')
            ignore_lines = ignore.readlines()
            for line in ignore_lines:
                stripped_line = line.rstrip()
                self.ignore.append(stripped_line)

    def creation_date(self, path_to_file):
        """
        Try to get the date that a file was created, falling back to when it was
        last modified if that isn't possible.
        See http://stackoverflow.com/a/39501288/1709587 for explanation.
        """
        if platform.system() == 'Windows':
            return os.path.getctime(path_to_file)
        else:
            stat = os.stat(path_to_file)
            try:
                return stat.st_mtime
            except AttributeError:
                return stat.st_birthtime

    def occupancy(self, directory, file):
        f = file + ".meta"
        meta_path = os.path.join(directory, f)
        with open(meta_path) as json_file:
            meta = json.load(json_file)
        occupation = meta["occupation"]
        if occupation > -1:
            origin_path = os.path.join(directory, file)
            date = self.creation_date(origin_path)
            arr = directory\
                .split("/")
            if arr.__len__() == 2:
                artist = arr[1]
            else:
                artist = arr[2]
            self.index[occupation] = Fragment(occupation, date, directory, artist, file)

    def is_meta(self, file):
        fa = file.split(".")
        i = len(fa)-1
        if i>0 and fa[i] == "meta":
            return True
        else:
            return False

    def has_meta(self, directory, file):
        f = file+".meta"
        meta_path = os.path.join(directory, f)
        if os.path.isfile(meta_path):
            return True
        else:
            return False

    def preindex(self, directory):
        self.init_json(directory)
        for root, dirs, files in os.walk(directory):
            self.add_ignore(root)

            print(root)

            arr = root.split("/")

            print(arr[2])

            if arr[2] in self.ignore:
                pass # ignore 폴더 처리
            else:
                # 2뎁스까지만 인덱스 함.
                if arr.__len__() < 4:
                    # files index
                    for f in files:
                        if self.is_meta(f):
                            pass
                        elif f in self.ignore:
                            pass
                        elif self.has_meta(root, f):
                            self.occupancy(root, f)
                        else:
                            self.add_timetable(root, f)
                if arr.__len__() > 2 and arr[2]:
                    # dirs index
                    for d in dirs:
                        if self.has_meta(root, d):
                            self.occupancy(root, d)
                        elif d in self.ignore:
                            pass
                        else:
                            self.add_timetable(root, d)

    def postindex(self):
        self.timetable = sorted(self.timetable, key=lambda fragment: fragment.update)
        print("----------- INDEXING ------------")
        # indexing
        for f in self.timetable:
            f.index = self.get_lastindex()
            self.index[f.index] = f
        self.update_indextable()
        self.save()

    def update_indextable(self):
        self.indextable = []
        for f in self.index:
            self.indextable.append(self.index[f])
        self.indextable = sorted(self.indextable, key=lambda fragment: fragment.index)

    def get_lastindex(self):
        last = 0
        self.update_indextable()
        for f in self.indextable:
            if f.index == last:
                last = last + 1
        return last

    def add_timetable(self, directory, file):
        path = os.path.join(directory, file)
        date = self.creation_date(path)
        arr = directory.split("/")
        if arr.__len__() > 2:
            artist = arr[2]
            self.timetable.append(Fragment(-1, date, directory, artist, file))

    '''
    # [deprecated] preindex 하기 전 소소
    def add(self, artist, fragment):
        temp = {
            "index" : 0,
            "update" : 0,
            "file" : {
                "artist": artist,
                "fragment": fragment
            }
        }

        added = False
        for f in self.json_data['fragments']:
            # 기존 조각과 비교
            if f['file'] == temp['file']:
                added = True

        if added:
            print("Already added - artist:", artist, ", fragment: ", fragment)
        else:
            self.count = self.count + 1
            print("Add fragment - artist:", artist, ", fragment: ", fragment)
            temp["index"] = self.count
            temp["update"] = int(time.time())
            self.temp_data['fragments'].append(temp)
    '''

    def save(self):
        print(json.dumps(self.indextable, cls=CustomEncoder))
        with open(self.index_path, 'w') as outfile:
            json.dump(self.indextable, outfile, indent=4, cls=CustomEncoder)
        self.count = len(self.indextable)

    def get_fragments(self):
        return self.indextable

    def get_count(self):
        return self.count

    def get_index(self, artist, name):
        for f in self.indextable:
            if f.artist == artist and f.file == name:
                return ("{}".format(f.index)).zfill(4)
        return -1;


class CustomEncoder(json.JSONEncoder):
    def default(self, o):
        return {'__{}__'.format(o.__class__.__name__): o.__dict__}

if __name__ == "__main__":
    freg = Fragments()
