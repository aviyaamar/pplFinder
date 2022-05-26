import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [checkBoxList, setcheckBoxList]= useState([])
  const localS = localStorage.getItem("Favorites");
  const parseLocalS = localS ? JSON.parse(localS) : [];
  const [favorites, setFavorites] = useState(parseLocalS);
  const [search, setSearch] = useState('')
  const [foundUsers, setFoundUsers] = useState([]);

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = users.filter((user) => {
        return user.location.country.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(users);
      // If the text field is empty, show all users
    }

    setSearch(keyword);
  };

  const checkConditionToVisible = (index) => {
    //console.log(hoveredUserId);
    return index === hoveredUserId || favorites.includes(users[index])
  }

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  //this function that handle to checkbox, recive two paramerter and every time checking
  //if this is true --> push the value to array and display the data
  const handleCheckBox = (value,state) => {
    let newArrayOFCheckbox = [];
    
    if(state === "add") {
      checkBoxList.forEach(item => {
        newArrayOFCheckbox.push(item);
      })
      newArrayOFCheckbox.push(value);
    } else {
      checkBoxList.forEach(item => {
        if (value !== item) {
          newArrayOFCheckbox.push(item);
        }
      })
    }
    setcheckBoxList(newArrayOFCheckbox);
   
  }

 
  const handleOnClickFavorite = (index) => {
   // console.log(index);
    let newFavorites = []
    console.log(favorites);
    if(favorites.includes(users[index])) {
      favorites.forEach(item => {
        if(users[index] != item){
          newFavorites.push(item)
        }
      })
    }
    else{
       favorites.forEach(item => {
          newFavorites.push(item);
       })
      newFavorites.push(users[index])

    }

    setFavorites(newFavorites)
    localStorage.setItem("Favorites", JSON.stringify(newFavorites))
  }
  return (
    <S.UserList>
        <S.Filters>
        <CheckBox value="BR" label="Brazil" onChangeFromUser={handleCheckBox} />
        <CheckBox value="AU" label="Australia" onChangeFromUser={handleCheckBox} />
        <CheckBox value="CA" label="Canada" onChangeFromUser={handleCheckBox}/>
        <CheckBox value="DE" label="Germany" onChangeFromUser={handleCheckBox} />
      </S.Filters>
      <S.List>
      <input
        type="search"
        placeholder="Filter"
        value={search}
        onChange={filter}
      />
     {/* this is for the input tab, this is work, but not perfectlly. this function need more  grinding
      <div className="user-list">
        {foundUsers && foundUsers.length > 0 ? (
          foundUsers.map((user, index) => {
            return (
               <S.User
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleOnClickFavorite(index)}
              >
                <S.UserPicture src={user?.picture.large} alt="" />
                <S.UserInfo>
                  <Text size="22px" bold>
                    {user?.name.title} {user?.name.first} {user?.name.last}
                  </Text>
                  <Text size="14px">{user?.email}</Text>
                  <Text size="14px">
                    {user?.location.street.number} {user?.location.street.name}
                  </Text>
                  <Text size="14px">
                    {user?.location.city} {user?.location.country}
                  </Text>
                </S.UserInfo>
                <S.IconButtonWrapper isVisible={checkConditionToVisible(index)}>
                  <IconButton>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>
              </S.User>
          )}
            
        )): (
          <h1>No results found!</h1>
        )}
      </div> */}
      {users.filter(user => {
          if(checkBoxList.length === 0 )  {
            return true;
          } 
          return checkBoxList.includes(user.location.country)
        }).map((user, index) => {  
       
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleOnClickFavorite(index)}
            >
        
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={checkConditionToVisible(index)}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
