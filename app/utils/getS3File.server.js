import { S3, GetObjectCommand } from '@aws-sdk/client-s3'

const REGION = 'us-west-2'
const client = new S3({ region: REGION })

const downloadStationData = ({params}) => {

}
