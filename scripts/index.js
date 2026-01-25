<<<<<<< HEAD:src/pages/index.js
import { enableValidation, resetValidation, settings } from "./validation.js";
=======
import { enableValidation, resetValidation, settings } from "./validate.js";
>>>>>>> 54f206b (Fix validation paths and restore cards rendering):scripts/index.js


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


const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");


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

    cardTitleEl.textContent = data.name;
    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;

    const cardLikeButton = cardElement.querySelector(".card__like-button");
    cardLikeButton.addEventListener("click", function () {
        cardLikeButton.classList.toggle("card__like-button_liked");
    });

        const cardDeleteButton = cardElement.querySelector(".card__delete-button");
        cardDeleteButton.addEventListener("click", function () {
            cardElement.remove();
        });


    cardImageEl.addEventListener("click", function () {
        previewImageEl.src = data.link; 
        previewImageEl.alt = data.name;
        previewCaptionEl.textContent = data.name;
        openModal(previewModalEl);
    });

    return cardElement;
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

editProfileButton.addEventListener("click", function () {
 openModal(editProfileModal);
resetValidation(editProfileFormEl, [editProfileNameInput, editProfileDescriptionInput]);
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
});

editProfileCloseBtn.addEventListener("click", function () {
    closeModal(editProfileModal);
    resetValidation(editProfileFormEl, [editProfileNameInput, editProfileDescriptionInput]);
});



addPostButton.addEventListener("click", function () {
    openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
    closeModal(newPostModal);
});


editProfileFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
    closeModal(editProfileModal);
});


newPostFormEl.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = newPostNameInput.value.trim();
    const link = newPostLinkInput.value.trim();

    if (name === "" || link === "") {
        return;
    }

    const inputValues = {
        name: name,
        link: link,
    };
    
    const cardElement = getCardElement(inputValues);
    cardsList.prepend(cardElement);

    newPostFormEl.reset();
    disableSubmitButton(submitButtonNewPost, settings);
    closeModal(newPostModal);
 
});


initialCards.forEach(function (item) {
    const cardElement = getCardElement(item);
    cardsList.append(cardElement);
<<<<<<< HEAD:src/pages/index.js
});

=======
});
>>>>>>> 54f206b (Fix validation paths and restore cards rendering):scripts/index.js
