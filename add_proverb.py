import sys

#thimo

while True:
    try:
        
        thimo = input("Andika Thimo Yaku (Add proverb): \n")
        if thimo != '':
            print('\nThimo updated. \n')
            
            with open("thimo.csv",  "a") as thimos:
                thimos.write(thimo + "\n")
        if thimo == '':
            print ('\nThank you for your contribution.')
            sys.exit()
        else:
            continue
        
    except ValueError as err:
        print ("Error", err)
