import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Fab, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import styled from "styled-components";
import Card from "../../components/Card";
import CardsFilters from "../../components/CardsFilters";

const CardsWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const CardsHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #757c87;
`;

const Title = styled.h1`
  width: 100%;
  color: #edf4ff;
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CardsContainer = styled.div`
  padding-top: 20px;
`;

const EmptyCardsPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;

  .signOutIcon {
    fill: #edf4ff;
  }
`;

@inject("cardsStore", "routerStore", "userStore")
@observer
class CardsPage extends Component {
  componentDidMount() {
    this.props.cardsStore.fetchCards();
  }

  handleSignOut = () => {
    const { userStore, cardsStore, routerStore } = this.props;
    userStore.signout();
    cardsStore.resetCards();
    routerStore.push("/signin");
  };

  renderCards = () => {
    const { cardsStore } = this.props;

    if (!cardsStore.cards.length) {
      return <EmptyCardsPlaceholder>No cards available. Create one?</EmptyCardsPlaceholder>;
    }

    return cardsStore.cards.map((card) => (
      <Card key={card.id} id={card.id} title={card.title} description={card.description} status={card.status} />
    ));
  };

  render() {
    return (
      <CardsWrapper>
        <CardsHeader>
          <Title>Get things done.</Title>

          <CreateButtonContainer>
            <Fab variant="extended" onClick={() => this.props.routerStore.push("/cards/create")}>
              <AddIcon />
              Create Card
            </Fab>

            <SignOutIconContainer>
              <IconButton onClick={this.handleSignOut}>
                <SignOutIcon className="signOutIcon" />
              </IconButton>
            </SignOutIconContainer>
          </CreateButtonContainer>
        </CardsHeader>

        <CardsFilters />

        <CardsContainer>{this.renderCards()}</CardsContainer>
      </CardsWrapper>
    );
  }
}

export default CardsPage;
