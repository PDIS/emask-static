#!/bin/bash

WORK_DIR='./'
LOG_DIR='./'
RESULT_DIR='./'

echo -n '' > "$WORK_DIR"temp_result.txt && \
ls "$LOG_DIR"uploadService*.gz \
  | xargs -I {} zcat {} >> "$WORK_DIR"temp_result.txt && \
cat "$LOG_DIR"uploadService.log >> "$WORK_DIR"temp_result.txt && \
echo 'idn|timestamp|ActID|token|nm|marketCd|StoreCd|birth|mobileNumber|email'> "$WORK_DIR"result_before_join_nih.txt
cat "$WORK_DIR"temp_result.txt \
  | grep -Eo '[0-9]{2}/[A-Z][a-z]{2}/[0-9]{4}:[0-9]{2}:[0-9]{2}:[0-9]{2} [-+][0-9]{4} POST /uploadService.do HTTP/[0-2.]+ 405 [0-9]+ [0-9]*[µm]*s \|\| BODY: \{.*\}$' \
  | grep -E 'BODY: {"ActID":.*"token".*"idn".*"nm".*"marketCd".*"storeCd".*"birth".*"mobileNumber".*"email"' \
  | sed -e's/POST \/uploadService.do HTTP\/[0-2.]* 405 [0-9]* [0-9]*[µm]*s || BODY: //' \
  | sed -re's/([0-9]{2}\/[A-Z][a-z]{2}\/[0-9]{4}:[0-9]{2}:[0-9]{2}:[0-9]{2} [-+][0-9]{4}) \{/{"timestamp": "\1",/' \
  | sed -re's/\{"timestamp":[ ]*"([^"]+)"[ ]*,[ ]*"ActID":[ ]*"([^"]+)"[ ]*,[ ]*"token":[ ]*"([^"]+)"[ ]*,.*"idn":[ ]*"([^"]*)"[ ]*,[ ]*"nm":[ ]*"([^"]*)"[ ]*,[ ]*"marketCd":[ ]*"([^"]*)"[ ]*,[ ]*"storeCd":[ ]*"([^"]*)"[ ]*,[ ]*"birth":[ ]*"([^"]*)"[ ]*,[ ]*("mobileNumber":[ ]*"[^"]*"[ ]*,[ ]*"email":[ ]*".*"[ ]*)\}/\1|\2|\3|\4|\5|\6|\7|\8|\9/' \
  | sed -re's/"mobileNumber":[ ]*"([^"]*)"[ ]*,[ ]*"email":[ ]*"(.*)"[ ]*/\1|\2/' \
  | awk -F '|' '{print $4"|"$1"|"$2"|"$3"|"$5"|"$6"|"$7"|"$8"|"$9"|"$10}' \
  | sort -t'|' -k1 -k2 -r  >> "$WORK_DIR"result_before_join_nih.txt

cat "$WORK_DIR"result_before_join_nih.txt \
  | uniq -w11 \
  | awk -F '|' '{print "\""$1"\",\""$2"\",\""$3"\",\""$4"\",\""$5"\",\""$6"\",\""$7"\",\""$8"\",\""$9"\",\""$10"\""}' >> "$WORK_DIR"tradevan_testing.csv

"$WORK_DIR"match.pl "$WORK_DIR"IHKEMASK-202003120900-202003182015.result "$WORK_DIR"result_before_join_nih.txt | uniq -w11 > "$WORK_DIR"result_join_nih_202003120900-202003182015.csv
gzip "$WORK_DIR"result_join_nih_202003120900-202003182015.csv && mv "$WORK_DIR"result_join_nih_202003120900-202003182015.csv.gz PDIS.$(date +%Y%m%d%H).csv.gz

rm "$WORK_DIR"temp_result.txt "$WORK_DIR"result_before_join_nih.txt
