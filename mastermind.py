# Mastermind Simple Strategy - Python
'''
Determine the number of winning combinations per number of rounds
Red = correct position and correct value
White = incorrect position and correct value

Winning combinations per # of rounds: [1, 4, 25, 108, 305, 602, 196, 49, 6, 0]
Total: 7471, Expected: 5.764660493827161
'''

def compare(guess, answer):
    temp_answer = answer.copy()
    red = 0
    white = 0
    for i in range(4):
        try:
            position = temp_answer.index(guess[i])
            if position == i or guess[position] == temp_answer[position]:
                red += 1
            else:
                white += 1     
            temp_answer[position] = -1
        except ValueError:
            continue
    return red, white

def filter_poss_comb(curr_guess, red_ans, white_ans, possible_combinations):
    bad_combinations = []
    for poss_comb in possible_combinations:
        red_poss, white_poss = compare(curr_guess, poss_comb)
        if red_poss != red_ans or white_poss != white_ans:
            bad_combinations.append(poss_comb) 
    return [x for x in possible_combinations if x not in bad_combinations]

if __name__ == "__main__":
    num_com_to_win = [0] * 10
    total = 0
    all_combinations = []

    for a in range(6):
        for b in range(6):
            for c in range(6):
                for d in range(6):
                    all_combinations.append([a,b,c,d])
    
    for answer in all_combinations:
        possible_combinations = all_combinations.copy()
        curr_guess = possible_combinations[0]
        guess_number = 0

        while curr_guess != answer:
            guess_number += 1
            red, white = compare(curr_guess, answer)  
            if red != 4:
                possible_combinations = filter_poss_comb(curr_guess, red, white, possible_combinations)
                curr_guess = possible_combinations[0]
        
        num_com_to_win[guess_number] += 1
        total += guess_number + 1

    print("Winning combinations per # of rounds: {}".format(num_com_to_win))
    print("Total: {}, Expected: {}".format(total, total/len(all_combinations)))