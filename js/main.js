class Card {
   constructor(data) {
      this.found = 0;
      this.cards = data.cards;
      this.cardBlock = document.querySelector(`#cardBlock`);
   }

   init() {
      this.showCards(this.cards, this.cardBlock);
      this.takeCard(this.cardBlock);
   }

   takeCard(block) {
      block.addEventListener('click', (event) => {
         let card, activeElements;
         
         card = event.target.closest('.card-item');
         if (!card) return;

         if (!card.classList.contains('found')) {
            card.classList.add('active');
         }

         activeElements = block.querySelectorAll('.active');

         if (activeElements.length > 1) {
            let first = activeElements[0].getAttribute('data-cardIndex');
            let second = activeElements[1].getAttribute('data-cardIndex');

            if (first == second) {
               this.found++;
               this.foundCards(Array.prototype.filter.call(activeElements, element => element))
            }

            setTimeout(() => this.resetActiveCards(), 320);
            this.restart(this.found);
         }
      });
   }

   foundCards(cards) {
      cards.forEach(el => el.classList.add('found'));
   }

   resetActiveCards() {
      let cards = document.querySelectorAll('.card-item');
      cards.forEach(el => el.classList.remove('active'));
   }

   resetFoundCards() {
      let cards = document.querySelectorAll('.card-item');
      cards.forEach(el => el.classList.remove('found'));
   }

   showCards(cards, block) {
      for (let i = 0; i < 2; i++) {
         let counter = 0;
         let selectedCards = new Set();

         while (counter != cards.length) {
            let index = this.selectRandomCard(0, cards.length - 1);

            if (!selectedCards.has(index)) {
               counter++;
               selectedCards.add(index);
               let card = this.createNode('div', 'card-item', block);
               card.innerHTML = this.cardInner(cards[index]);
               card.setAttribute('data-cardIndex', index);
            }
         }
      }
   }

   restart(found) {
      if (found == this.cards.length) {
         setTimeout(() => {
            let res = document.querySelector('#restartBlock');
            let resButton = res.querySelector('#restart');
            let close = res.querySelector('#close');

            res.classList.add('open');
            resButton.addEventListener('click', () => {
               location.href = location.href;
            });
            close.addEventListener('click', () => {
               window.close();
            });
         }, 500);
      }
   }

   selectRandomCard(min, max) {
      return Math.round(min + Math.random() * (max - min));
   }

   createNode(elementType, className, parentNode) {
      let node = document.createElement(elementType);
      node.classList.add(className);
      parentNode.append(node);
      return node;
   }

   cardInner(photo) {
      return `
         <div class="card-item-outside"><img src="images/codepen-logo.png" alt="photo"></div>
         <div class="card-item-inside"><img src="images/${photo}.png" alt="photo"></div>
      `;
   }
}

new Card({ cards: cards }).init();