import Text.Parsec
import Text.Parsec.String (Parser)
import qualified Text.Parsec.Expr as Ex
import qualified Text.Parsec.Token as Tok
import Text.Parsec.Language (emptyDef)
import Data.Functor.Identity (Identity)

-- Lexer
lexer = Tok.makeTokenParser style
  where
    ops = ["+", "-", "*", "/", "^"]
    names = ["sin", "cos", "tan", "log", "sqrt", "exp", "pi", "e"]
    style = emptyDef {
      Tok.reservedOpNames = ops,
      Tok.reservedNames = names
    }

parens = Tok.parens lexer
reserved = Tok.reserved lexer
reservedOp = Tok.reservedOp lexer
float = Tok.float lexer
integer = Tok.integer lexer
whiteSpace = Tok.whiteSpace lexer

-- AST
data Expr
  = Number Double
  | Unary String Expr
  | Binary String Expr Expr
  | Const String
  deriving (Show)

expr :: Parser Expr
expr = Ex.buildExpressionParser table term
  where
    table = [
        [prefix "-" (Unary "-"), prefix "+" id],
        [binary "^" (Binary "^") Ex.AssocRight],
        [binary "*" (Binary "*") Ex.AssocLeft, binary "/" (Binary "/") Ex.AssocLeft],
        [binary "+" (Binary "+") Ex.AssocLeft, binary "-" (Binary "-") Ex.AssocLeft]
      ]
    binary name fun assoc = Ex.Infix (reservedOp name >> return fun) assoc
    prefix name fun = Ex.Prefix (reservedOp name >> return fun)

term = parens expr
  <|> try function
  <|> fmap Const (reserved "pi" >> return "pi")
  <|> fmap Const (reserved "e" >> return "e")
  <|> fmap (Number . fromIntegral) integer
  <|> fmap Number float

function = do
  func <- many1 letter
  arg <- parens expr
  return $ Unary func arg

eval :: Expr -> Double
eval (Number n) = n
eval (Const "pi") = pi
eval (Const "e") = exp 1
eval (Unary "sin" e) = sin (eval e)
eval (Unary "cos" e) = cos (eval e)
eval (Unary "tan" e) = tan (eval e)
eval (Unary "log" e) = log (eval e)
eval (Unary "sqrt" e) = sqrt (eval e)
eval (Unary "exp" e) = exp (eval e)
eval (Unary "-" e) = - (eval e)
eval (Binary "+" e1 e2) = eval e1 + eval e2
eval (Binary "-" e1 e2) = eval e1 - eval e2
eval (Binary "*" e1 e2) = eval e1 * eval e2
eval (Binary "/" e1 e2) = eval e1 / eval e2
eval (Binary "^" e1 e2) = eval e1 ** eval e2

main :: IO ()
main = do
  let input = "sin(pi / 2) + log(e ^ 2)"
  case parse (whiteSpace >> expr) "<input>" input of
    Left err -> print err
    Right ex -> print $ eval ex
