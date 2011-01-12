#/bin/bash

# Call from project root. Pass CouchDB username as first argument. Password should be in $COUCH_PASSWORD.

# drop test activities
curl -s http://127.0.0.1:5984/smartgraphs/_design/app/_list/urls-with-revs/revs-of-test-activities | xargs -n 1 printf "http://%s:%s@127.0.0.1:5984/smartgraphs/%s\n" $1 $COUCH_PASSWORD | xargs curl -vX DELETE

# reset test activities
for name in `ls apps/smartgraphs/activity_json/test/*.json` ; do
  printf http://127.0.0.1:5984/smartgraphs/test.%s `basename $name .json` | xargs -n 1 curl -vX PUT -d@$name
done
