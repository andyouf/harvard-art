import { getEl } from "./utils.js";

// this variable will be changed on every search/pagination update
let galleryImages = [];

const gallery = getEl("#gallery");
const wrapper = getEl("#gallery .wrapper");
const buttonNext = getEl("#gallery .next");
const buttonPrev = getEl("#gallery .prev");
const buttonClose = getEl("#gallery .close");

buttonClose.addEventListener("click", onGalleryClose);
buttonNext.addEventListener("click", onNextGalleryImage);
buttonPrev.addEventListener("click", onPrevGalleryImage);

export function updateGallery(records) {
  // only keep the records with images
  galleryImages = records.filter((record) => record.primaryimageurl);
}

export function onGalleryInit(event) {
  gallery.classList.add("active");

  wrapper.innerHTML = "";
  wrapper.style.width = `${galleryImages.length * 100}vw`;
  wrapper.style.gridTemplateColumns = `repeat(${galleryImages.length}, 100vw)`;
  wrapper.dataset.total = galleryImages.length;
  wrapper.dataset.current = event.target.dataset.index;
  // repositions an element in 3D space
  wrapper.style.transform = `translate3d(${
    wrapper.dataset.current * -100
  }vw, 0, 0)`;

  galleryImages.forEach((gallery) => {
    if (gallery.images.length > 0) {
      const figure = document.createElement("figure");

      gallery.images.forEach((img) => {
        const image = document.createElement("img");
        image.src = img.baseimageurl;
        figure.appendChild(image);
      });

      figure.dataset.total = gallery.images.length;
      figure.dataset.current = 0;
      figure.style.height = `${gallery.images.length * 100}vh`;
      figure.classList.add("gallery-figure");
      figure.addEventListener("click", onInnerGalleryNext);

      wrapper.appendChild(figure);
    }
  });

  gallery.appendChild(wrapper);
}

function onInnerGalleryNext(event) {
  const { target } = event;
  const total = parseInt(target.dataset.total);
  const current = parseInt(target.dataset.current);
  target.dataset.current = current === total - 1 ? 0 : current + 1;
  target.style.transform = `translate3d(0, ${
    target.dataset.current * -100
  }vh, 0)`;
}

function onNextGalleryImage() {
  const total = parseInt(wrapper.dataset.total);
  const current = parseInt(wrapper.dataset.current);
  wrapper.dataset.current = current === total - 1 ? current : current + 1;
  wrapper.style.transform = `translate3d(${
    wrapper.dataset.current * -100
  }vw, 0, 0)`;
}

function onPrevGalleryImage() {
  const current = parseInt(wrapper.dataset.current);
  wrapper.dataset.current = current === 0 ? 0 : current - 1;
  wrapper.style.transform = `translate3d(${
    wrapper.dataset.current * -100
  }vw, 0, 0)`;
}

function onGalleryClose() {
  gallery.classList.remove("active");
  wrapper.style = null;
}
