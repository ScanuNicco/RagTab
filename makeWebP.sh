#!/bin/bash
for f in ./*.*pg*; do
    # do some stuff here with "$f"
    # remember to quote it or spaces may misbehave
	cwebp "$f" -o "${f}.webp"
done
