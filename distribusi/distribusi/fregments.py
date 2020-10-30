import json
import time
from operator import itemgetter

class Fregments:
    def __init__(self):
        self.file = 'fregments_index.json';
        with open(self.file) as json_file:
            self.json_data = json.load(json_file)
            print(json.dumps(self.json_data))

        self.temp_data = {"fregments":[]}
        self.count = len(self.json_data["fregments"])


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
        with open(self.file, 'w') as outfile:
            json.dump(self.json_data, outfile, indent=4)
        self.count = len(self.json_data["fregments"])

    def get_fregments(self):
        fregments = self.json_data['fregments']
        # reverse
        fregments.sort(key = itemgetter('index'), reverse=True)
        return fregments

    def get_count(self):
        return self.count



if __name__ == "__main__":
    freg = Fregments()
