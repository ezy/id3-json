#!/usr/bin/env python2

# @brief   dump id3 tag info to .json file
# @version 0.1
# @author  gongqijian
# @create  2013/04/11

import os
import sys
import getopt
import json
import eyed3

filters = ['mp3', 'Mp3', 'MP3']

def usage(errno):
    print 'Usage: id3dump [option] dir|file\n\
Option:\n\
    -h      --help      print help\n\
    -f      --force     replace exists file\n\
Example:\n\
    id3dump example.mp3'
    return errno

def proc_dir(path, force):
    for subdir, dirs, files in os.walk(path):
        for file in files:
            if file[-3:] in filters:
                proc_file('%s/%s' % (subdir, file), force)

def proc_file(file, force):
    output = "%s.json" % file

    if os.path.exists(output) and not force:
        print "'.json' file already exists, please use '-f' or '--force' option!"
        return

    fields = {}
    subfields = {}
    tag = eyed3.load(file).tag

    fields['title'] = tag.title
    fields['track'] = tag.track_num
    fields['album'] = tag.album
    fields['artist'] = tag.artist
    #fields['genre'] = tag.genre
    #fields['year'] = tag.year

    for comment in tag.comments:
        subfields[comment.description if comment.description else None] = comment.text

    fields['comments'] = subfields;

    with open(output, "w") as text_file:
        #text_file.write("%s" % fields)
        text_file.write(json.dumps(fields))
        text_file.close()

def main():

    try:
        opts, args = getopt.getopt(sys.argv[1:], 'hf', ['help', 'force'])
    except:
        exit(usage(2))

    if len(args) < 1:
        exit(usage(1))

    force = False

    for o, a in opts:
        if o in ("-h", "--help"):
            exit(usage(0))
        elif o in ("-f", "--force"):
            force = True

    for arg in args:
        proc_file(arg, force) if os.path.isfile(arg) else proc_dir(arg, force)

if __name__ == "__main__":
    main()
