import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import InfiniteScroll from 'react-infinite-scroll-component'
//import Spinner from "components/Spinner";

const Home = () => {
  const { users, isLoading , fetchUsers} = usePeopleFetch();

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <InfiniteScroll
        dataLength = {users.length}
        next={fetchUsers}
        hasMore={true}
        loader={<S.Spinner></S.Spinner>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        >
     <UserList users={users} isLoading={isLoading} />
        </InfiniteScroll>
       
      </S.Content>
    </S.Home>
  );
};

export default Home;
