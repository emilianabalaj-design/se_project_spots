import "./index.css";
import { enableValidation, resetValidation, settings } from "../scripts/validate.js";
import { setButtonText } from "../utils/helpers.js"
import Api  from "../utils/api.js"


const initialCards = [
    {
        name: "Golden Gate Bridge",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
    },
    {
        name: "Val Thorens",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    },
    {
        name: "Restaurant terrace",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    },
    {
        name: "An outdoor cafe",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    },
    {
        name: "A very long bridge over the forest",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    },
    {
        name: "Tunnel with morning light",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    },
    {
        name: "Mountain house",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    }
];

enableValidation(settings);


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d8d57a0b-9cf6-4122-a9ae-abb7b75e053c",
    "Content-Type": "application/json"
  }
});


api.getAppInfo()
  .then(([userData, cards]) => {
    cards.forEach((item) => {
    const cardElement = getCardElement(item);
    cardsList.append(cardElement);
  });
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
    profileAvatarEl.src = userData.avatar;
})
.catch(console.error);


const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");


const editProfileFormEl = editProfileModal.querySelector(".modal__form");

const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");


const addPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");


const newPostFormEl = newPostModal.querySelector(".modal__form");

const newPostNameInput = newPostModal.querySelector("#card-caption-input");
const newPostLinkInput = newPostModal.querySelector("#card-image-input");


const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

// Avatar elements
const avatarModal = document.querySelector("#edit-avatar-modal"); 
const avatarCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarFormEl = avatarModal.querySelector(".modal__form");
const avatarLinkInput = avatarModal.querySelector("#profile-avatar-input");
const profileAvatarEl = document.querySelector(".profile__avatar");

// Delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteConfirmBtn = deleteModal.querySelector(".modal__submit-btn");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteFormEl = deleteModal.querySelector(".modal__form");
let  selectedCard;
let selectedCardID;

//Close delete modal
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");

const previewModalEl = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModalEl.querySelector(".modal__close-btn");
const submitButtonNewPost = newPostModal.querySelector(".modal__submit-btn");
const previewImageEl = previewModalEl.querySelector(".modal__image-preview");
const previewCaptionEl = previewModalEl.querySelector(".modal__caption");

previewModalCloseBtn.addEventListener("click", function () {
    closeModal(previewModalEl);
});


const cardTemplate = document
.querySelector("#card-template")
.content
.querySelector(".card");


const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitleEl = cardElement.querySelector(".card__title");
    const cardImageEl = cardElement.querySelector(".card__image");

    //TODO - if the card is liked,set the active class on the card

    cardTitleEl.textContent = data.name;
    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;

    const cardLikeButton = cardElement.querySelector(".card__like-button");
    cardLikeButton.addEventListener("click", () => handleLike(cardLikeButton, data._id));
    if (data.isLiked) {
        cardLikeButton.classList.toggle("card__like-button_liked")
    }
        const cardDeleteButton = cardElement.querySelector(".card__delete-button");
        cardDeleteButton.addEventListener("click", function () {
            handleDeleteCard(cardElement, data._id);
        });

    function handleLike(likeBtn, cardId) {
        const isLiked = likeBtn.classList.contains("card__like-button_liked");
        
        api.changeLikeStatus(cardId, isLiked)
        .then(() => {
            likeBtn.classList.toggle("card__like-button_liked");
        })
        .catch(console.error);
    
    }

    function handleDeleteCard(cardElement, cardId) {

            selectedCard = cardElement;
            selectedCardID = cardId;
            openModal(deleteModal);
        }


    cardImageEl.addEventListener("click", function () {
        previewImageEl.src = data.link; 
        previewImageEl.alt = data.name;
        previewCaptionEl.textContent = data.name;
        openModal(previewModalEl);
    });

    return cardElement;
}

deleteCloseBtn.addEventListener("click", ()=> {
    closeModal(deleteModal);
});

deleteCancelBtn.addEventListener("click", () => {
    closeModal(deleteModal);
});

function handleAvatarSubmit(event) {
    event.preventDefault();
    avatarInfo(avatarLinkInput.value)
    .then((data) => {
        profileAvatarEl.src = data.avatar;
        closeModal(avatarModal);
        avatarFormEl.reset();
        resetValidation(avatarFormEl, settings);
    })
    .catch(console.error);
    }


function handleEscClose(event) {
    if (event.key === "Escape") {
        const openedModal = document.querySelector(".modal_is-opened");
        if (openedModal) {
            closeModal(openedModal);
        }
    }
}

function handleOverlayClose(event) {
    if (event.target.classList.contains("modal_is-opened")) {
        closeModal(event.target);
       
    }
}

function openModal(modal) {
    modal.classList.add("modal_is-opened");
    document.addEventListener("keydown", handleEscClose);
    modal.addEventListener("click", handleOverlayClose);
}


function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
    document.removeEventListener("keydown", handleEscClose);
    modal.removeEventListener("click", handleOverlayClose);
}

editProfileButton.addEventListener("click", () => {
    openModal(editProfileModal);
    
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;

    resetValidation(editProfileFormEl,[editProfileNameInput, editProfileDescriptionInput] , settings);
});

editProfileCloseBtn.addEventListener("click", function () {
    closeModal(editProfileModal);
    
});



addPostButton.addEventListener("click", function () {
    openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
    closeModal(newPostModal);
});


avatarModalBtn.addEventListener("click", function () {
    openModal(avatarModal);
});


avatarCloseBtn.addEventListener("click", function () {
    closeModal(avatarModal);
    resetValidation(avatarFormEl, settings);
});

avatarFormEl.addEventListener("submit", handleAvatarSubmit);

function handleDeleteSubmit(event) {
            event.preventDefault();
            api
            .deleteCard(selectedCardID)
            .then(() => {
                closeModal(deleteModal);
                selectedCard.remove();
            })
                .catch(console.error);
        }


deleteFormEl.addEventListener("submit", handleDeleteSubmit);

editProfileFormEl.addEventListener("submit", (event) => {
    console.log("EDIT PROFILE SUBMIT FIRED");
  event.preventDefault();

  const submitBtn = editProfileFormEl.querySelector(".modal__submit-btn");

  setButtonText(submitBtn, true);

  api.editUserInfo({
    name: editProfileNameInput.value,
    about: editProfileDescriptionInput.value,
  })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
});

newPostFormEl.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = newPostNameInput.value.trim();
    const link = newPostLinkInput.value.trim();

    if (name === "" || link === "") {
        return;
    }
    
   api.postNewCard(name, link)
   .then((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsList.prepend(cardElement);
    newPostFormEl.reset();
    closeModal(newPostModal);
   })
   .catch(console.error);
});

  




