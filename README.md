# 📝 LicenseDAO | DAOHacks hackathon 2022

### Primer 🧠

License DAO is a collectivelly managed and standardised repository of IP licenses residing on the IPFS. 

Everything we publish on web pages is licensed. One way or another. Copyright, GNU License, CC0 license, CC BY license, ToS of a platform or a specific tailored license. 

While there’s no consensus around the NFT licenses yet and developers often link CC0 back to the Creative Commons website, we propose the licenses to be stored on the IPFS and managed by the LicenseDAO to create legal certainty for the Web3 community. 

### Technical details ⚙️

For this project we wanted to go with a fully decentralized approach, for this reason we chose to host the website on the IPFS, manage events with graphs on GraphiQL, and use web3 storage and ceramic to host the licenses and cover letters, thus allowing our infrastructure to be fully on chain with no centralised function.

 - Website stored on IPFS
 - Events managed with GraphiQL
 - Cover letters sent to IPFS storage
 - Licenses hosted on Ceramic infrastructures

### Problems we solve 🛠️
 
 - LicenseDAO resolves the legal uncertainties around the storage of the IP rights content creators want to attach to their digital assets. 
 - It offers a broader specter of licenses collectivelly composed, recognised as valid and used by the Web3 community without the need to rely on one server, entity or jurisdiction at the time.
 - By design, the IPFS stored licenses protect their creations in a much more resilient and efficient manner than regular licensing frameworks. In addition, this protocol layer solution allows for automated, on-chain execution of reserved or waived rights. 
 - Content creators can now adhere to a simplified and standardised framework to build complex revenue-split relationships and will no longer have to rely on platforms alone to provide such solutions.

## Quick Start 🏁

1. install your dependencies

   bash
   ```yarn install```
   
💡 if yarn is not already installed, check [the yarn website](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)

2. run the tests
bash
# Run all the tests 🧪
yarn test

The test will deploy automatically and you should see the transactions happening

## More information!

- run all test with yarn test


## Mockups Time !! 📲

### Find below different mockups of the finished website

#### 1. Welcoming page

On the first page when you open the website you will be proposed the licenses already accepted and the ones that are pending.

On the top right corner you can check out user and licenses as well as create and account and apply for the DAO. 


![Landing Page](/mockups/landing-page.png)

#### 2. User login 

Here you can see the login page displayed when you click on the top right-hand corner.

After creating your account, you will be able to submit your profile to the members of the DAO by writing a cover letter.
This letter should contain your motivations for entering the organisation and the points that make you a valuable addition to the DAO.


![Join DAO](/mockups/join-dao.png)

Once you click on the join button you can start submitting your cover letter.

![Submit cover letter](/mockups/account-coverletter-submit.png)



#### 3. Licenses

To submit Licenses, you first have to get accepted into the dao, after this point you can submit by clicking on the "Submit license" that replaces the "Connect" button.

Simply click on the submission button and start filling in the relevant information about your proposal :

   - Author's Name :\
 the name of the license's author.
   
   - Title of the license :\
 The title you wish to give to your license.
   
   - Abreviation of the license :\
   Here you can put in a short name for the proposed license or an abbreviation. A good example would be the abbreviation of an Attribution-Share-Alike 4.0 International Creative Commons License: CC BY-SA 4.0.
   
   - License version :\
   Here you can indicate what version of a license you are proposing (e.g. 1.0 or 2.0). If this not the first of a kind license, be sure to scroll down and mark its Precursors in the field below.
   
   - Summary :\
   Here you can briefly described what this license is about, who composed it and why it's used.
   
   - Disclaimer :\
   Here you can add a disclaimer to limit your liability and responsibility as an author of the proposal.
   
   - Statement of purpose :\
   Here you can describe the purpose and motivation for creating the license. You can also describe historical events that have led you to believe the license  is needed by the community.
   
   - License text :\
   Here you can add the whole legal code of the license, one that specifically addresses reserved and/or waived rights of the content creators utilising the license.
   
   - Precursors :\
   If this is not the 1.0 version of the license, please indicate what are the preceding versions of it.
 


![upload license](/mockups/license-upload-form.png)

#### 4. Voting !

After a license has been submitted for review, you can consult it and vote for or against it, the vote system will work with a minimum quorum, and requires at least 51% of votants to be in favor of it to adopt the new license.

![license vote](/mockups/vote-license.png)


This sums up the basis of the website.
