from converter import Converter
conv = Converter()

info = conv.probe('1234.mov')

convert = conv.convert('1234.mov', '111.mov', {
    'format': 'mp4',
    'audio': {
        'codec': 'aac',
        'samplerate': 11025,
        'channels': 2
    },
    'video': {
        'codec': 'h264',
        'width': 720,
        'height': 400,
        # 'fps': 25
    }})

for timecode in convert:
    print(f'\rConverting ({timecode:.2f}) ...')