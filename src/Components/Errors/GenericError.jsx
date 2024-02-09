const GenericError = () => {
  const reload = () => window.location.reload()
  return (
    <div>
      <h1>¡UPS!</h1>
      <p>Algo va mal.</p>
      <p>¿Por qué no pruebas a <a onClick={reload}>recargar</a>?</p>
    </div>
  )
}

export default GenericError
