:- use_module(library(read), [read_from_chars/2]).

calc(X + Y, R) :- calc(X, RX), calc(Y, RY), R is RX + RY.
calc(X - Y, R) :- calc(X, RX), calc(Y, RY), R is RX - RY.
calc(X * Y, R) :- calc(X, RX), calc(Y, RY), R is RX * RY.
calc(X / Y, R) :- calc(X, RX), calc(Y, RY), R is RX / RY.
calc(X ^ Y, R) :- calc(X, RX), calc(Y, RY), R is RX ** RY.

calc(sin(X), R) :- calc(X, RX), R is sin(RX).
calc(cos(X), R) :- calc(X, RX), R is cos(RX).
calc(tan(X), R) :- calc(X, RX), R is tan(RX).
calc(log(X), R) :- calc(X, RX), R is log(RX).
calc(sqrt(X), R):- calc(X, RX), R is sqrt(RX).
calc(exp(X), R) :- calc(X, RX), R is exp(RX).

calc(pi, R) :- R is pi.
calc(e, R)  :- R is exp(1).

calc(X, X) :- number(X).

:- initialization(main).

main :-
    read_line_to_codes(user_input, Codes),
    read_from_chars(Codes, Termo),
    catch(calc(Termo, Resultado),
          Err,
          (write('Erro: '), writeln(Err), halt(1))),
    format('Resultado: ~w~n', [Resultado]).
