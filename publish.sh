gcloud config set compute/zone asia-east1-a
gcloud container clusters get-credentials prod

if [[ $# -ne 1 ]] ; then
    echo 'Usage: Provide a release tag.  It will apply to the uploaded image and to the deployment'
    echo 'For instance:'
    echo './publish.sh v1'
    exit 1
fi

#Build the docker image.  This builds the project as well.
RELEASE=${1}
PROJECT=shewroteit-1366
REPOSITORY=shewroteit
TAG=gcr.io/$PROJECT/$REPOSITORY:$RELEASE
VERSION=stackableregiments/$REPOSITORY:$RELEASE

docker build -t  $VERSION .

#Tag the image
docker tag $VERSION $TAG
#Upload the image to the container repository
gcloud docker -- push $TAG
