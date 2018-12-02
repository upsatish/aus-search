#!/bin/bash
#wget -O ./data/gnaf-latest.zip https://data.gov.au/dataset/19432f89-dc3a-4ef3-b943-5326ef1dbecc/resource/4b084096-65e4-4c8e-abbe-5e54ff85f42f/download/FEB18gnafpipeseparatedvalue20180219141901.zip
mkdir ./data/tmp
unzip -o ./data/gnaf-latest.zip -d ./data/tmp
rm -f ./data/*.psv
mv ./data/tmp/FEB18_GNAF_PipeSeparatedValue_20180219141901/G-NAF/G-NAF\ FEBRUARY\ 2018/Authority\ Code/*.psv ./data/
mv ./data/tmp/FEB18_GNAF_PipeSeparatedValue_20180219141901/G-NAF/G-NAF\ FEBRUARY\ 2018/Standard/*.psv ./data/
rm -rf ./data/tmp
