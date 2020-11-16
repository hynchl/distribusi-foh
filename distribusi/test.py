# Added by Hyunchul
# 2020. 10. 26
from distribusi.cli import build_argparser, distribusify
from distribusi import fragments
from distribusi.distribusi import build_index

parser = build_argparser()
args = parser.parse_args()

event_path = './events'
data_path = './test_data'

freg = fragments.Fragments()
freg.preindex(event_path)
freg.preindex(data_path)
freg.postindex()

distribusify(args, event_path, freg)
distribusify(args, data_path, freg)

build_index(args, data_path, freg)