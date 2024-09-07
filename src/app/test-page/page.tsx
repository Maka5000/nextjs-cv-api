import {
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

export default function TestPage() {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: "eu-north-1" },
      identityPoolId: "eu-north-1:d6ca6804-100a-4df1-a9a6-9bdd5e59d7e7",
    }),
  });

  const command = new PutObjectCommand({
    Bucket: "cv-api-bucket",
    Key: "nando-jpeg-quality-001.jpg",
  });

  // const command = new GetObjectCommand({
  //   Bucket: "cv-api-bucket",
  //   Key: "nando-jpeg-quality-001.jpg",
  // });
  //   const command = new ListObjectsCommand({ Bucket: "cv-api-bucket" });
  //   client.send(command).then(({ Contents }) => console.log(Contents));
  client.send(command).then((response) => console.log(response));

  return <div>Test Page</div>;
}
