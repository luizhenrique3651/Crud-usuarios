import "./card.css"
interface CardProps{
    matricula : number,
    nome : string,
    senha : string
}

export function Card({matricula, nome, senha} : CardProps){
    return(
        <div className="card">
            <h2>{matricula}</h2>
            <h2>{nome}</h2>
            <p><b>Valor: {senha}</b></p>
        </div>
    )
}