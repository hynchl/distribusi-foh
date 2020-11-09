import os
import platform
import json
import time
from operator import itemgetter


class Fregment:
    def __init__(self, index, update, directory, artist, file):
        self.index = index
        self.update = update
        self.directory = directory
        self.artist = artist
        self.file = file

    def __repr__(self):
        return repr((self.index, self.update, self.directory, self.artist, self.file))


class Fregments:
    def __init__(self):
        self.index = {}
        self.indextable = []
        self.timetable = []
        self.events_dir = './events/'
        self.config_file = 'config.json'
        self.index_file = 'fregments_index.json'

        with open(self.index_file) as json_file:
            self.json_data = json.load(json_file)

        self.temp_data = {"fregments":[]}
        self.count = len(self.json_data["fregments"])

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
            artist = directory.split("/")[2]
            self.index[occupation] = Fregment(occupation, date, directory, artist, file)

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
        for root, dirs, files in os.walk(directory):
            if root == directory:
                pass
            else:
                # files index
                for f in files:
                    if self.is_meta(f):
                        pass
                    elif f == "index.html":
                        pass
                    elif self.has_meta(root, f):
                        self.occupancy(root, f)
                    else:
                        self.add_timetable(root, f)
                # dirs index
                for d in dirs:
                    if self.has_meta(root, d):
                        self.occupancy(root, d)
                    else:
                        self.add_timetable(root, d)

        self.timetable = sorted(self.timetable, key=lambda fregment: fregment.update)
        print("----------- INDEXING ------------")
        # indexing
        for f in self.timetable:
            f.index = self.get_lastindex()
            self.index[f.index] = f

        self.update_indextable()
        print(self.indextable)

    def update_indextable(self):
        self.indextable = []
        for f in self.index:
            self.indextable.append(self.index[f])
        self.indextable = sorted(self.indextable, key=lambda fregment: fregment.index)

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
        artist = directory.split("/")[2]
        self.timetable.append(Fregment(-1, date, directory, artist, file))

    def add(self, artist, fregment):
        temp = {
            "index" : 0,
            "update" : 0,
            "file" : {
                "artist": artist,
                "fregment": fregment
            }
        }

        added = False
        for f in self.json_data['fregments']:
            # 기존 조각과 비교
            if f['file'] == temp['file']:
                added = True

        if added:
            print("Already added - artist:", artist, ", fregment: ", fregment)
        else:
            self.count = self.count + 1
            print("Add fregment - artist:", artist, ", fregment: ", fregment)
            temp["index"] = self.count
            temp["update"] = int(time.time())
            self.temp_data['fregments'].append(temp)

    def save(self):
        print(json.dumps(self.temp_data))
        for f in self.temp_data['fregments']:
            self.json_data['fregments'].append(f)
        with open(self.index_file, 'w') as outfile:
            json.dump(self.json_data, outfile, indent=4)
        self.count = len(self.json_data["fregments"])

    def get_fregments(self):
        fregments = self.json_data['fregments']
        # reverse
        fregments.sort(key = itemgetter('index'), reverse=True)
        return fregments

    def get_count(self):
        return self.count

    def get_index(self):
        return 0;



if __name__ == "__main__":
    freg = Fregments()
