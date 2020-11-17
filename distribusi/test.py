# Added by Hyunchul
# 2020. 10. 26
from distribusi.cli import build_argparser, distribusify
from distribusi import fregments
from distribusi.distribusi import build_index

parser = build_argparser()
args = parser.parse_args()

data_path = args.directory

freg = fregments.Fregments()
freg.preindex(data_path)
freg.postindex()

distribusify(args, data_path, freg)

build_index(args, data_path, freg)