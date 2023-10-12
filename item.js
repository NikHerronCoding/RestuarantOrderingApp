export class Item{
    constructor({name, ingredients, id, price, emoji}) {
        this.name = name
        this.ingredients = ingredients
        this.id = id
        this.price = price
        this.emoji = emoji
    }

    createHTML() {
        return `
        <div class="item">
            <div class="item-left">
                <p class="icon-large">
                    ${this.emoji}
                </p>

                <div class="item-info">
                    <p class="item-title">
                        ${this.name}
                    </p>

                    <p class="item-ingredients">
                        ${this.ingredients.join(', ')}
                    </p>

                    <p class="item-price">
                        $${this.price}
                    </p>
                </div>
            </div>
            <div class="buttons-container ">

                
                <div class="item-button" class="button-icon">
                    <i class="fa-solid fa-plus icon" i" id="${this.name.toLowerCase()}"></i>
                </div>
    
            </div> 
        
        </div>
        
        
        `
    }




    
}