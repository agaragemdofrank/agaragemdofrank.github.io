"""Cria WebP responsivo sem alterar os originais. Requer Pillow."""
from pathlib import Path
from PIL import Image, ImageOps
import argparse, re, unicodedata, json

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('origem', type=Path)
parser.add_argument('destino', type=Path)
parser.add_argument('--prefixo', default='personalizado')
args=parser.parse_args()
prefix=re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',args.prefixo).encode('ascii','ignore').decode().lower()).strip('-')
if not prefix: parser.error('Use um prefixo com letras ou números.')
args.destino.mkdir(parents=True,exist_ok=True)
sources=[args.origem] if args.origem.is_file() else sorted(p for p in args.origem.iterdir() if p.suffix.lower() in ['.jpg','.jpeg','.png','.webp'])
result=[]
for i,source in enumerate(sources,1):
    with Image.open(source) as raw:
        im=ImageOps.exif_transpose(raw).convert('RGB')
        names=[]
        for width in [400,800,1200]:
            target=args.destino/f'{prefix}-{i:02d}-{width}.webp'
            if target.exists() or target.resolve()==source.resolve(): raise FileExistsError(f'Arquivo já existe: {target}. Use outro destino ou prefixo.')
            resized=im.copy();resized.thumbnail((width,round(im.height*width/im.width)))
            resized.save(target,'WEBP',quality=84,method=6)
            names.append({'arquivo':str(target),'width':resized.width,'height':resized.height})
        result.append({'original':str(source),'variantes':names})
print(json.dumps(result,ensure_ascii=False,indent=2))
