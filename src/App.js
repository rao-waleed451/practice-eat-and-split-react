import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
 let [friendOpenForm,setFriendOpenForm]=useState(false)
 let [friends,setFriends]=useState(initialFriends);
 let [selectedFriend,setSelectedFriend]=useState(null)

function handleFriendlistSubmit(friend){
  console.log("waleed")
      setSelectedFriend((currFrnd)=> currFrnd?.id===friend.id?null:friend)
      setFriendOpenForm(false)
}

 function handleaddFriendFriendlist(newFriend){
        setFriends((currArr)=> [...currArr,newFriend])
        setFriendOpenForm(false)
 }

  function handleAddNewFriendButton(){
      setFriendOpenForm((curr)=> !curr)
  }
  return (
    <div className="App">
      <div className="sidebar">
          <FriendList friends={friends} handleFriendlistSubmit={handleFriendlistSubmit} selectedFriend={selectedFriend}/>
         {friendOpenForm && <NewFriend handleaddFriendFriendlist={handleaddFriendFriendlist}/>}
          <Button onClick={handleAddNewFriendButton}>{friendOpenForm ?"Close":"Add Friend"}</Button>
      </div>
      <div className="main">
        { selectedFriend && <SplitBill Friend={selectedFriend}/>}
      </div>
    </div>
  );
}

export default App;


function FriendList({friends,handleFriendlistSubmit,selectedFriend}){
  return (
    <ul>
    {friends.map((friend)=> <Friend friend={friend} key={friend.id} handleFriendlistSubmit={handleFriendlistSubmit} selectedFriend={selectedFriend}/>)}
    </ul>
  )
}


function Friend({friend,handleFriendlistSubmit,selectedFriend}){
  let isSelected=selectedFriend?.id===friend.id
  return (
    <>
     <li className={isSelected?"selected":""}>
        <img src={`${friend.image}`} alt={friend.name}></img>
        <h3>{friend.name}</h3>
       {friend.balance>0 && <p className= "green">you owe {friend.name} {Math.abs(friend.balance)} </p>}
       {friend.balance<0 && <p className= "red">{friend.name} owe you {Math.abs(friend.balance)} </p>}
       {friend.balance===0 && <p>you and {friend.name} are even </p>}
       <Button onClick={()=> handleFriendlistSubmit(friend)}>{isSelected?"Close":"Submit"}</Button>
      </li>
     
      </>
  )
}

function Button({children ,onClick}){
  return (
    <button className="button" onClick={onClick}>{children}</button>
  )
}


function SplitBill({Friend}){
  return (
    <form>
      <h1>SPLIT A BILL WITH {Friend.name}</h1>

      <label>Bill value</label>
      <input type="text"></input>

      <label>Your expense</label>
      <input type="text"></input>

      <label>Sarah expense</label>
      <input type="text"  disabled></input>

      <label>who is payaing the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  )
}


function NewFriend({handleaddFriendFriendlist}){
  let [newName,setNewName]=useState("");
  let [newImage,setNewImage]=useState("https://i.pravatar.cc/48");
  let id=crypto.randomUUID();
  function handleNewFriendSubmit(e){
      e.preventDefault()
     if(!newName || !newImage)   return
      let newFriend={
        image:newImage,
        name:newName,
        id,
        balance:0

      }

      console.log(newFriend)
      handleaddFriendFriendlist(newFriend)
  }
  return (
    <form onSubmit={(e)=> handleNewFriendSubmit(e)}>
      <label>Friend Name</label>
      <input value={newName} onChange={(e)=> setNewName(e.target.value)}></input>
      <label>Friend Image</label>
      <input value={newImage} onChange={(e)=> setNewImage(e.target.value)}></input>

      <Button>Add</Button>
    </form>
  )
}