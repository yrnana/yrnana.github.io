#!/bin/sh

# get variable from input
read -p "title : " title
read -p "excerpt : " excerpt
read -p "tags : " tags
date1=$(date +%F)
date2=$(date +%FT%T+09:00)

# create markdown file
message2="$(tr [A-Z] [a-z] <<<"$title")"
slug=$date1"-"${message2// /-}
markdown="./_contents/posts/$slug.md"
touch $markdown

# insert data to markdown
echo "---" >>$markdown
echo "title: '$title'" >>$markdown
echo "date: '$date2'" >>$markdown
if [ "$excerpt" != "" ]; then
  echo "excerpt: '$excerpt'" >>$markdown
fi
if [ "$tags" != "" ]; then
  echo "tags: [$tags]" >>$markdown
fi
echo "published: false" >>$markdown
echo "---" >>$markdown

# exit
exit 0
