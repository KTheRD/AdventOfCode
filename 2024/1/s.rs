fn main() {
    let input = std::fs::read_to_string("input").expect("file not found");
    println!("{:?}", solve(&input));
}

fn solve(input: &str) -> [u64; 2] {
    let (mut a, mut b): (Vec<_>, Vec<_>) = input
        .split_terminator("\n")
        .map(|s| s.split_once("   ").map(|(a, b)| [a, b]).unwrap())
        .map(|ab| ab.map(|s| s.parse::<u64>().unwrap()))
        .map(|[a, b]| (a, b))
        .collect();

    a.sort_unstable();
    b.sort_unstable();
    let p1 = a.iter().zip(&b).map(|(&a, &b)| a.abs_diff(b)).sum();
    let p2 = a
        .iter()
        .flat_map(|&a| b.iter().map(move |&b| a * u64::from(a == b)))
        .sum();
    [p1, p2]
}
