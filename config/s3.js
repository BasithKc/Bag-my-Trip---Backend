const { S3Client, PutObjectCommand, DeleteObjectsCommand } = require('@aws-sdk/client-s3')

const bucketName = "bagmytrip";
const region = "eu-north-1";
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }

})

//uploads a file to s3
async function uploadFile(file, folder) {
  const fileName = `${folder}/${Date.now()}-${file.originalname}`

  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: fileName,
    ContentType: file.mimetype
  }

  const command = await new PutObjectCommand(uploadParams)
  await s3.send(command) //Send to S3

  //Return the url of uploaded s3 file
  return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
}

async function deleteImages(urls) {
  const objects = urls.map(url => ({
    Key: getKeyFromUrl(url)
  }))

  //Create params
  const deleteParams = {
    Bucket: bucketName,
    Delete: { Objects: objects }
  }
  const command = await new DeleteObjectsCommand(deleteParams)
  const response = await s3.send(command)
  return response
}

// Extract the key from S3 URL
function getKeyFromUrl(url) {
  const urlParts = url.split('.amazonaws.com/')
  return urlParts[1].trim()
}

exports.uploadFile = uploadFile
exports.deleteImages = deleteImages



//downloads a file from s3
