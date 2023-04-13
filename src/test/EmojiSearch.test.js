import App from "../App"
import { render, screen } from "@testing-library/react"
import emojiList from "../emojiList.json"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom'


describe("Emoji Search Test",()=>{
    let  headerRender,emojiLists,emojiInput,copyEmoji;
   
    beforeEach(()=>{
        render(<App/>)
        headerRender =screen.getByText("Emoji Search")
    // emojiListten ilk 20 kayıt alınır:
        emojiLists = emojiList.slice(0, 20)
        //label verilerek getByLabelText() ile de yapılabilirdi.
        //Inputa data-testid verilerek içeriği okunur
        emojiInput=screen.getByTestId("searchInput")
       
    })

    test('Header başarılı bir şekilde render edilmeli ', () => {
        expect(headerRender).toBeInTheDocument()
    });

    test('Emoji listesi  başarılı bir şekilde render edilmeli',() =>{
   // tek tek doküman'da var mı kontrol edilir:
   emojiLists.map((emoji)=>{
    expect(screen.getByText(emoji.title)).toBeInTheDocument()
    })
   });


   test('Emoji listesi filtreye uygun şekilde yeniden render edilmeli', () => {
      // herhangi bir emoji tanımlanır ve inputa yollanır:
        const emoji="Joy"
        //Inputa tanımladığımız emojiyi ekliyoruz:
        userEvent.type(emojiInput,emoji)
        //Inputa değer girildiğinde click etmeye gerek kalmadan 
        // filtreleme yaptığından direkt dökümanda tanımladığımız emoji var mı onu kontrol ediyoruz:
       // userEvent.click(emojiInput);
        expect(screen.getByText(emoji)).toBeInTheDocument();
    });


    test('Herhangi emojiye tıklandığında ilgili emoji kopyalanmalıdır', () => {
        copyEmoji = screen.getByText("Grinning")
        userEvent.click(copyEmoji)
        expect(copyEmoji.parentElement.getAttribute("data-clipboard-text")).toMatch("😀")
     });


  

    
})