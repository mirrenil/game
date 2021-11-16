Q1  Ready to play?
    Start game
Q2  Choose to pick up or leave the "flugsvamp" {
    if (flygsvamp)
    set state: flugsvamp = true --- go to Q3
} else {
    move to the next step --- go to Q3
}
Q3  Pick up the macbook or the chantarelle or go on {
    if (macbook)
    required state = flugsvamp - set state: macbook = true --- go to Q4
    } if (chantarelle) {
    required state = flugsvamp - set state: chantarelle = true --- go to Q4
    } else {
    move on to the next step --- go to Q4
}
Q4  How do you go home? {
    if (sparkcykel) {
        go to Q5
    } if (You hate scooters so you flip it over and curse) {
        go to Q6
    } else if (run home) {
        go to Q7
    }
}
Q5  Out of service on your phone, a zombie catches you and you die
    -1 restart

Q6  You walk home and someone is following you, your neighbour which is now a zombie. You tell the zombie to take your mushrooms instead --- go to Q11

Q7  On your way home you you see a zombie, what do you do? {
    if (try to run) {
        go to Q8
    } if (throw "flugsvamp") {
         required state: flugsvamp -- go to Q9
    } if (bribe zombie with macbook air) {
        required state: macbook -- qo to Q10
    } else if (throw chantarelles at the zombie) {
        required state: chantarelle -- go to Q11
    }
}
Q8  Your attempt to run is impossible, you´re an easy catch for the zombie
    -- -1 restart
Q9  You idiot, did you really think that flugsvamp would kill the zombie?
    -- -1 restart
Q10 The zombie is laughing at you, takes your macbook and leaves you 
    required state: macbook 
    You may have lost your macbook air but you survived, congratulations! --- -1 restart

Q11 You threw chantarelles at the zombie and it got an allergic reaction. The zombie catches fire and you take your mushroom basket and go home and live happily ever after --- -1 restart
