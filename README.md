# S3UploadDemo

### AWS User Setup Steps

1.  Create an [Amazon Web Services (AWS)](https://aws.amazon.com) free account.
2.  Under the header `AWS services` on the AWS dashboard, search for and select `IAM`.
3.  In the left nav, select `Users`.
4.  Click the `Add user` button near the upper left corner of the page.
5.  Enter a user name into the `User name` text field. This can be anything (`s3user`, etc.)
6.  Select (check) the checkbox next to `Programmatic access`.
7.  Click the `Next: Permissions` button.
8.  Select `Attach existing policies directly`. (No need to create a group.)
9.  In the `Filter policies` search field, type `S3`.
10. Select (check) the checkbox next to `AmazonS3FullAccess`.
11. Scroll down and click on the `Next: Tags` button.
12. Skip this screen by clicking the `Next: Review` button. (Unless you want to add specific tags for the user.)
13. Click on the `Create user` button.
14. This will take you to a page with your `Access key ID` and `Secret access key` values. Click the `Show` button to view your `Secret access key`, then save both your `Access key ID` and `Secret access key` somewhere safe and secure. **Important: this is the _only_ time you will be able to view/copy your secret access key without generating a new one, so be sure to save it!!!**

### AWS S3 Bucket Creation

1.  Go back to the main AWS dashboard.
2.  Under the header `AWS services` on the AWS dashboard, search for and select `S3`.
3.  Click `Create bucket`.
4.  In the `Bucket name` text field, select a unique name for your bucket. This name must be completely unique (across AWS), all lowercased, and must not contain spaces. (This could be your project name, for instance.)
5.  Select the region you wish to store your bucket data in. It is recommended that you choose a region geographically near you.
6.  Click the `Next` button.
7.  The next screen, `Configure options`, allows you to set custom properties for your bucket. Click the `Next` button.
8.  This screen, `Set permissions` allows you to set public permissions for your bucket:

- Uncheck `Block all public access`
- Check `I acknowledge that the current settings may result in this bucket and the objects within becoming public`, which will appear above the rest of the checkboxes. (We'll discuss what this means below.)
- Leave the remaining checkboxes unchecked, so that your buckets are not blocked from public access.
- Leave the `Manage system permissions` select menu as is: `Do not grant Amazon S3 Log Delivery group write access to this bucket`.

9.  Click the `Next` button.
10. On the next screen, `Review`, give your settings a once-over. If they look good, click on the `Create Bucket` button.
11. On the `S3 buckets` screen, find your new bucket's name and click on the associated link.
12. In the bucket settings screen, click on the `Permissions` tab.
13. On the following screen, click on `Bucket Policy`.
14. In the `Bucket policy editor`, paste the following JSON object:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicRead",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::BUCKET_NAME_GOES_HERE/*"]
    }
  ]
}
```

15. Edit the object's `Resource` key to replace `BUCKET_NAME_GOES_HERE` with your bucket name, spelled/capitalized correctly.
16. Click on the `Save` button. It will trigger a warning: `This bucket has public access; You have provided public access to this bucket. We highly recommend that you never grant any kind of public access to your S3 bucket.`
17. Click on the `Save` button again.

### Project Setup Steps

1.  After creating an IAM user and S3 bucket, clone this repo to your computer.
2.  `cd` into the newly-created directory.
3.  Run `npm install` to install all dependancies required for this project.
4.  It is recommended at this point that you follow the `Protecting-API-Keys-In-Node` tutorial in the `Resources` or NodeJS folder in your class GitLab.

- This tutorial will talk you through installing the npm package `dotenv`, requiring it, and setting up a `.env` file to hold your private keys/passwords/etc.
- It is very important that you hide your AWS S3 `Access key ID` and `Secret access key` values. If they are accidentally pushed to GitHub or posted online, your bucket may be disabled (or worse!) as this is a violation of the AWS Customer Agreement. Make sure you set up environment variables and follow this tutorial!!!

4.  Once you have your `Access key ID` and `Secret access key` (and maybe even your bucket name) stored in environment variables, update the `keys.js` using those environment variables.
5.  Review the code and the accompanying comments, and implement in your own projects or applications. (Be sure to check out the form in `index.html` and the front-end JS in `script.js`, as both are important pieces of the puzzle.)

### Important Notes

- Everything you upload/store in your S3 bucket will be public. This is not considered a best practice. Considering researching how to make the items private; this gives you better control over your bucket's contents. Please be mindful of security when building web services.
- Remember that pushing either your `Access key ID` or `Secret access key` to a public site such as GitHub may cause Amazon to disable your bucket/account! Be sure to "hide" all private values (S3 keys, API keys, db passwords, etc) in your back-end code using the technique discussed in the `Protecting-API-Keys-In-Node` tutorial in the `Resources` or NodeJS folder in your class GitLab.
- The URL to access the uploaded objects will be `https://BUCKET_NAME.BUCKET_REGION.amazonaws.com/FILE_NAME`. See [this link](http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region) to determine the value to substitute for `BUCKET_REGION`. For example: if my S3 bucket was called `sarah-test-bucket`, in the US West (Oregon) region and I had a file in the root directory called `kitten.jpg` the URL to access it would be `https://sarah-test-bucket.s3-us-west-2.amazonaws.com/kitten.jpg`
- You can use [Cyberduck](https://cyberduck.io) or the [AWS Console](https://console.aws.amazon.com/console/home) to view, delete, upload, and download files (and much more) from your S3 bucket.
- Amazon Web Services S3 is **not** a free service. Please be aware of all fees related to the use of this service. As of 02/05/2020 the pricing information can be found [here](https://aws.amazon.com/s3/pricing/).
- Contact me with any questions: [sarah.cullen@du.edu](mailto:sarah.cullen@du.edu). Feel free to submit issues or pull requests on GitHub.
