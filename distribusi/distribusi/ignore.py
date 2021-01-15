import os
import re

class Ignore:
    def __init__(self):
        self.ignore = ['.ignore']
        self.ignore_file = '.ignore'
        return

    def add(self, directory):
        ignore_path = os.path.join(directory, self.ignore_file)
        if os.path.isfile(ignore_path):
            ignore = open(ignore_path, 'r')
            ignore_lines = ignore.readlines()
            for line in ignore_lines:
                stripped_line = line.rstrip()
                self.ignore.append(stripped_line)

    def test(self, target):
        if target in self.ignore:
            return True

        for ig in self.ignore:
            reg = re.compile(ig)
            if bool(re.match(reg, target)):
                return True

        return False

    def testRoot(self, target):
        path = target.split('/')
        path_len = len(path)
        if path_len > 2:
            artist = path[2].strip()

        # 이벤트 폴더가 아닌 폴더는 3depth 이상은 무시
        if path_len > 3:
            if artist == "events":
                pass
            else:
                return True

        if path_len > 4:
            return True

        if path[path_len-1] in self.ignore or path[path_len-1] == "":
            return True

        for ig in self.ignore:
            reg = re.compile(ig)
            if bool(re.match(reg, target)):
                return True

        return False