# Added by Hyunchul
# 2020. 10. 26
from distribusi.cli import build_argparser, distribusify

parser = build_argparser()
args = parser.parse_args()
distribusify(args, args.directory)
