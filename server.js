const express = require("express");
const app = express();
app.use(express.json());

const users = [
  {
    id: 1,
    isActive: true,
    balance: "$1,111.15",
    picture: "http://placehold.it/32x32",
    age: 37,
    name: "Elsa Castaneda",
    gender: "female",
    company: "OTHERWAY",
    email: "elsacastaneda@otherway.com",
    phone: "+1 (988) 404-2932",
  },
  {
    id: 2,
    isActive: true,
    balance: "$1,823.59",
    picture: "http://placehold.it/32x32",
    age: 35,
    name: "Ollie Osborn",
    gender: "female",
    company: "VIASIA",
    email: "ollieosborn@viasia.com",
    phone: "+1 (947) 442-2611",
  },
  {
    id: 3,
    isActive: true,
    balance: "$1,734.78",
    picture: "http://placehold.it/32x32",
    age: 29,
    name: "Dean Huff",
    gender: "male",
    company: "NORALEX",
    email: "deanhuff@noralex.com",
    phone: "+1 (816) 575-2363",
  },
];
const children = [
  {
    id: 11,
    name: "Christina Bray",
    parent_id: 1,
    age: 6,
  },
  {
    id: 12,
    name: "Farrell Boone",
    parent_id: 1,
    age: 4,
  },
  {
    id: 13,
    name: "Gary Maddox",
    parent_id: 2,
    age: 4,
  },
  {
    id: 14,
    name: "Helena Burt",
    parent_id: 2,
    age: 6,
  },
  {
    id: 15,
    name: "Beryl Duke",
    parent_id: 2,
    age: 7,
  },
];

/* Get Request */
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = users.find((user) => user.id == userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      msg: "Not found!",
    });
  }
});

app.get("/users/:userId/children", (req, res) => {
  const userId = req.params.userId;
  const userChildren = children.filter((child) => child.parent_id == userId);
  if (userChildren.length !== 0) {
    res.json(userChildren);
  } else {
    res.status(404).json({
      msg: "Not found!",
    });
  }
});

app.get("/users/:userId/children/:childId", (req, res) => {
  const userId = req.params.userId;
  const childId = req.params.childId;
  const child = children.find(
    (child) => child.parent_id == userId && child.id == childId
  );

  if (child) {
    res.json(child);
  } else {
    res.status(404).json({
      msg: "Not found!",
    });
  }
});

/* Post Request */
app.post("/users", (req, res) => {
  const body = req.body;

  if (
    body.id === undefined ||
    body.id < 1 ||
    body.isActive === undefined ||
    body.balance === undefined ||
    body.balance === "" ||
    body.picture === undefined ||
    body.picture === "" ||
    body.age === undefined ||
    body.age < 1 ||
    body.name === undefined ||
    body.name === "" ||
    body.gender === undefined ||
    body.gender === "" ||
    body.company === undefined ||
    body.company === "" ||
    body.email === undefined ||
    body.email === "" ||
    body.phone === undefined ||
    body.phone === ""
  ) {
    res.status(400).json({ msg: "Please fill all the fields" });
  }

  if (users.find((user) => user.id == body.id)) {
    res.status(409).json({
      msg: "Id already exists!",
    });
  }

  users.push(body);
  res.status(201).json(body);
});

app.post("/users/:userId/children", (req, res) => {
  const parentId = req.params.userId;
  const body = req.body;

  if (parentId != body.parent_id) {
    res.status(400).json({ msg: "Syntax Error!" });
  }

  if (
    body.id === undefined ||
    body.id < 1 ||
    body.name === undefined ||
    body.name === "" ||
    body.parent_id === undefined ||
    body.parent_id < 1 ||
    body.age === undefined ||
    body.age < 1
  ) {
    res.status(400).json({ msg: "Please fill all the fields" });
  }

  if (children.find((child) => child.id == body.id)) {
    res.status(409).json({
      msg: "Id already exists!",
    });
  }

  if (!users.find((user) => user.id == body.parent_id)) {
    res.status(404).json({
      msg: "User is not found!",
    });
  }

  children.push(body);
  res.status(201).json(body);
});

/* Delete Request */
app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = users.find((user) => user.id == userId);

  if (!user) {
    res.status(404).json({
      msg: "Not found!",
    });
  } else {
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.sendStatus(204);
  }
});

app.delete("/users/:userId/children/:childId", (req, res) => {
  const userId = req.params.userId;
  const childId = req.params.childId;
  const child = children.find(
    (child) => child.id == childId && child.parent_id == userId
  );

  if (!child) {
    res.status(404).json({
      msg: "Not found!",
    });
  } else {
    const index = children.indexOf(child);
    children.splice(index, 1);
    res.sendStatus(204);
  }
});

app.listen(3000, () => {
  console.log("Server started");
});

/*
  {
    "id": 10,
    "isActive": true,
    "balance": "$1,111.15",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "name": "Elsa Castaneda",
    "gender": "female",
    "company": "OTHERWAY",
    "email": "elsacastaneda@otherway.com",
    "phone": "+1 (988) 404-2932"
  }

    {
    "id": 11,
    "name": "Christina Bray",
    "parent_id": 1,
    "age": 6
  }
*/
