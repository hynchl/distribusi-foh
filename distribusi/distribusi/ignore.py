import os


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
        else:
            return False
