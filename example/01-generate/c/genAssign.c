
#include "rlib.h"

void E();
void T();
void F();
void Exp();
void id ();

// === BNF Grammar =====
// Assign = id '=' Exp
// Exp = T ([+-] T)?
// T = F ([*/] F)?
// F = [0-9] | (Exp)


int main(int argc, char * argv[]) {
	id();
    printf("=");
    Exp();
	int i;
	for (i=0; i<10; i++) {
        id();
        printf("=");
		Exp();
		printf("\n");
	}
}

void Exp() {
	E();
	int i;
	for (i=0; i<10; i++) {
		E();
		printf("\n");
	}
}

void id () {
    char idList[] = {"x", "y", "z", "a", "b", "c"};
    char randString = randSelect(&idList ,6);
  printf("%s",&randString);
}

void E() {
    T();
	while (randInt(10) < 3) {
       printf("%c", randChar("+-"));
	   T();
	}
}

void T() {
    F();
	if (randInt(10) < 7) {
		printf("%c", randChar("*/"));
		F();
	}
}

void F() {
    if (randInt(10) < 8) {
		printf("%c", randChar("0123456789"));
	} else {
		printf("(");
		E();
		printf(")");
	}
}
