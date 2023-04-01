
// enables additional environmental variables from the .env file
require( "dotenv" ).config();
// for writing to files
const fs = require( "fs" );

// formatted json sample output for one report simple information:
// {
//   "chamber": "House",
//   "citation": "H. Rept. 104-642",
//   "congress": 104,
//   "number": 642,
//   "part": 1,
//   "type": "HRPT",
//   "updateDate": "2021-07-10 11:37:43+00:00",
//   "url": "https://api.congress.gov/v3/committee-report/104/HRPT/642?format=json"
// }
// 
// sample output for one report's detailed information search:
// {
//   committeeReports: [
//     {
//       associatedBill: [Array],
//       associatedTreaties: [],
//       chamber: 'House',
//       citation: 'H. Rept. 104-642',
//       committees: [Array],
//       congress: 104,
//       isConferenceReport: false,
//       issueDate: '1996-06-27T04:00:00Z',
//       number: 642,
//       part: 1,
//       reportType: 'H.Rept.',
//       sessionNumber: 2,
//       title: 'UNITED STATES ARMED FORCES PROTECTION ACT OF 1996',
//       type: 'HRPT',
//       updateDate: '2021-07-10T11:37:43Z'
//     }
//   ],
//   request: {
//     congress: '104',
//     contentType: 'application/json',
//     format: 'json',
//     reportNumber: '642',
//     reportType: 'hrpt'
//   }
// }
// associatedBill array:
// [
//   {
//     congress: 104,
//     number: '3308',
//     type: 'HR',
//     url: 'https://api.congress.gov/v3/bill/104/hr/3308?format=json'
//   }
// ]
// committees array:
// [
//   {
//     name: 'Armed Services Committee',
//     systemCode: 'hsas00',
//     url: 'https://api.congress.gov/v3/committee/house/hsas00?format=json'
//   }
// ]
// there are 21 either mostly continuous or semicontinuous committees, but only
// the ones marked with stars (*) have reports which issue text-parsable vote
// tabulations: others may not record them (X) or have them in image format (I)
// Natural Resources Committee (I)
// Rules Committee (*)
// Judiciary Committee (I)
// Energy and Commerce Committee (I)
// Transportation and Infrastructure Committee (*)
// Homeland Security Committee (*)
// Financial Services Committee (I)
// Appropriations Committee (I)
// Education and the Workforce Committee (I)
// Science, Space, and Technology Committee (X)
// Small Business Committee (X)
// Veterans' Affairs Committee (*)
// Agriculture Committee (*)
// Oversight and Accountability Committee (X)
// Ways and Means Committee (*)
// Ethics Committee (XI)
// Foreign Affairs Committee (X)
// Armed Services Committee (*I)
// Budget Committee (*I)
// House Administration Committee (X)
// Intelligence (Permanent Select) Committee (*)

let house_committees = [
    "Natural Resources Committee",
    "Rules Committee",
    "Judiciary Committee",
    "Energy and Commerce Committee",
    "Transportation and Infrastructure Committee",
    "Homeland Security Committee",
    "Financial Services Committee",
    "Appropriations Committee",
    "Education and the Workforce Committee",
    "Science, Space, and Technology Committee",
    "Small Business Committee",
    "Veterans' Affairs Committee",
    "Agriculture Committee",
    "Oversight and Accountability Committee",
    "Ways and Means Committee",
    "Ethics Committee",
    "Foreign Affairs Committee",
    "Armed Services Committee",
    "Budget Committee",
    "House Administration Committee",
    "Intelligence (Permanent Select) Committee"
]
async function foo() {
    let simple_search_results = await fs.readFile( "simple_search_results.json", "utf8", ( err ) => {} );
    let data = await fetch( `https://api.congress.gov/v3/committee-report/${ 117 }/HRPT/${ 621 }?format=json&api_key=${ process.env.USER_TOKEN }` );
    data = await data.text();
    data = JSON.parse( data );
    console.log( data );
    console.log( data.committeeReports[ 0 ].associatedBill );
    console.log( data.committeeReports[ 0 ].committees );
}

foo();
