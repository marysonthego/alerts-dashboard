export const initUser = {
    isLoggedIn: 0,
    custid: 0,
    firstname: '',
    lastname: '',
    email: '',
    cell: '',
    addr1: '',
    addr2: '',
    city: '',
    st: '',
    zip: '',
    usertype: 'customer',
};

export const initCustomers = [
  {
  isLoggedIn: 0,
  custid: 0,
  firstname: '',
  lastname: '',
  email: '',
  cell: '',
  addr1: '',
  addr2: '',
  city: '',
  st: '',
  zip: '',
  usertype: 'customer',
  },
]

export const initLocation = 
    {
      id: 0,
      custid: 0,
      cell: "",
      city: "",
      st: "",
      zip: "",
      nickname: "",
      weatheralert: false,
      virusalert: false,
      airalert: false,
    };  

    export const initLocations = [ 
    {
      id: 0,
      custid: 0,
      cell: "",
      city: "",
      st: "",
      zip: "",
      nickname: "",
      weatheralert: false,
      virusalert: false,
      airalert: false,
    },
  ];

export const initFriend = 
    {
      id: 0,
      custid: 0,
      active: true,
      firstname: "",
      city: "",
      st: "",
      zip: "",
      cell: "",
      weatheralert: false,
      virusalert: false,
      airalert: false,
    };
  
    export const initFriends = [
    {
      id: 0,
      custid: 0,
      active: true,
      firstname: "",
      city: "",
      st: "",
      zip: "",
      cell: "",
      weatheralert: false,
      virusalert: false,
      airalert: false,
    },
  ];
  
export const initUserErrors = {
  custid: 0,
  firstname: "",
  lastname: "",
  email: "",
  cell: "",
  pwd: "",
  pwd2: "",
  newpwd: "",
  newpwd2:"",
};

export const initLocationErrors = 
    {
      id: 0,
      locid: 0,
      city: "",
      st: "",
      zip: "",
    };
  
export const initFriendErrors = 
    {
      id: 0,
      friendId: 0,
      firstname: "",
      city: "",
      st: "",
      zip: "",
      cell: "",
    };

export const initAll = {
  user: {
    isLoggedIn: 0,
    custid: 0,
    firstname: '',
    lastname: '',
    email: '',
    cell: '',
    addr1: '',
    addr2: '',
    city: '',
    st: '',
    zip: '',
    usertype: 'customer',
  }, 
  locations: [
    {
      id: 0,
      custid: 0,
      cell: '',
      city: '',
      st: '',
      zip: '',
      nickname: '',
      weatheralert: false,
      virusalert: false,
      airalert: false,
    },
  ],
  friends: [
    {
      id: 0,
      custid: 0,
      active: true,
      firstname: '',
      city: '',
      st: '',
      zip: '',
      cell: '',
    },
  ],
};

export const initAllErrors = {
    custid: 0,
    firstname: "",
    lastname: "",
    email: "",
    cell: "",
    pwd: "",
    pwd2: "",
    newpwd: "",
    newpwd2:"",
  locationsErrors: [
    {
      id: 0,
      locid: 0,
      city: "",
      st: "",
      zip: "",
    },
  ],
  friendsErrors: [
    {
      id: 0,
      friendId: 0,
      firstname: "",
      city: "",
      st: "",
      zip: "",
      cell: "",
    },
  ],
};

// export const initDonation = {
//   custid: 0,
//   firstname: "",
//   lastname: "",
//   email: "",
//   cell: "",
//   address1: "",
//   address2: "",
//   city: "",
//   state: "",
//   zip: "",
//   card: "",
//   exp: "",
//   cvv: "",
//   amount: 0,
//   repeating: false,
//   interval: "",
//   startdate: ""
// };

// export const initDonationErrors = {
//   firstname: "",
//   lastname: "",
//   email: "",
//   cell: "",
//   address1: "",
//   city: "",
//   state: "",
//   zip: "",
//   card: "",
//   exp: "",
//   cvv: "",
// };
