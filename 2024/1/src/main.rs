use std::fs;

fn main() {
    let input = fs::read_to_string("input").expect("Error reading input file");
    let _result = input.lines().map(|line| line.split_whitespace());
}
