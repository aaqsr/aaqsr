---
layout: page.njk
redirect_from: [/444, /cs444]
navstyles: " "
---

# CS 444: Compiler Construction

## The Java Compiler

This was a term-long project done in a team of three. Our job? Building a Java 1.3 to i386 compiler, from scratch, in a language of our choice.

Because one learns best by being thrown in the deep end, we picked Rust to be this language. Our compiler was about 15,000 lines by the end, hand-rolled through a 7-stage pipeline: lexer, LALR(1) parser generator, parser, an AST transformer, a static semantic analyser, a type checker, and finally an x86 code generator.

Choosing Rust was a bit of a controversial choice at the time, since most teams doing this project in Rust seem to really struggle with it. We didn't. We loved it. The algebraic type system made modelling the AST trivial, the borrow checker kept us honest around all the pointer-like structures a compiler ends up needing, and the zero-cost abstractions meant we never had to trade elegance for performance. Genuinely no aspects of the language annoyed us the whole term, which is rare for any language on a project this size.

We tried to keep things simple wherever we could. The lexer was hand-rolled off a peeking char iterator rather than a "correct" regex engine, the LR(1) parser generator was close to line-for-line out of the Dragon Book, and the transformer that turns the parsing-AST into a usable AST is about 2000 lines that just pattern matches its way through every nonterminal. After all simple things are easy to verify. Simple code is best code.

The backend was the hardest part. And, for me, the most enjoyable. I spent several days on perfecting our code generation.

We laid out objects as vtable-prefixed structs with fields stored inline (including inherited ones), modelled arrays as a variant of the same reference type carrying their own element type id, and dispatched interface calls with a runtime linear scan over a supertype descriptor table. 

None of us run x86 natively or run Linux day to day, so getting our generated binaries to actually run meant assembling for i386 Linux ELF and running them through a VM (WSL on Windows, OrbStack on macOS). A full test run took 30-60 seconds because of this, but it worked astonishingly well! Debugging the assembly output was made bearable by gdb, which is, and I stand by this, the greatest program software engineers have ever written.

I also spent a lot of time validating our compiler against a large integration test suite of 200+ programs, including the full public Marmoset test cases, custom edge cases we wrote for the Joos 1W language subset, and stress tests for things like array casts, constructor evaluation order, and expression evaluation order.

## Where I spent most of my time

Since it was a team of three, here's roughly my slice of it, pulled from our post-assignment reports. Of course all of our work was done in highly collaborative settings. For example, some of this work was done in pair programming settings. And most of us did bits of everything to understand the compiler as a whole. 

So I think a better phrasing is that this is where I devoted my attention most towards:

- Lexing keywords and punctuation, and writing most of the unit/integration tests (and the Makefile) for the front end
- The parsing-AST to usable-AST conversion for classes, interfaces, methods, and fields
- The AST visitor pattern and a pretty-printer (turns our transformed and annotated AST back into Java source commented with our annotations; invaluable for debugging)
- Name disambiguation, field initializer forward-reference checks, cycle detection and DFS setup for the type hierarchy, and a good chunk of the type checker (assignability, visibility, finality) plus general error-handling machinery
- Core codegen infrastructure: instructions, name mangling, label conventions, calling/stack layout, type ID assignment, `instanceof`/cast checks, and most of the statement and expression codegen (control flow, field/array access, object creation, virtual and interface dispatch)
- A bunch of bug fixes around non-deterministic builds, null checks, and array access

## Attributions

A huge thanks to my lovely, indispensible teammates, [Patrik Buhring](https://optimisticpeach.github.io/) and Avish Kathpal! As well as our supportive professor, [Ondřej Lhoták](https://plg.uwaterloo.ca/~olhotak/). 

Thank you all for making the project possible (and for making java bearable).
