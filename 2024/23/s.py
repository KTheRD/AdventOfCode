input_file = open("bigboy2", "r")
lines = input_file.readlines()
input_file.close()

graph: dict[str, set[str]] = {}
for line in lines:
    a, b = line.strip().split("-")
    if a not in graph:
        graph[a] = set()
    if b not in graph:
        graph[b] = set()
    graph[a].add(b)
    graph[b].add(a)

max_clique = set()


def find_clique(clique: set[str], possible: set[str], excluded: set[str]):
    global max_clique
    if len(possible) == 0:
        if len(clique) > len(max_clique):
            max_clique = clique.copy()
        return

    pivot = next(iter(possible.union(excluded))) if possible.union(excluded) else None

    for node in list(possible - (graph[pivot] if pivot else set())):
        find_clique(
            clique.union({node}),
            possible.intersection(graph[node]),
            excluded.intersection(graph[node]),
        )
        possible.remove(node)
        excluded.add(node)


find_clique(set(), set(graph.keys()), set())

print("Max clique size:", len(max_clique))
print("Nodes in the max clique:", ",".join(sorted(max_clique, key=str.lower)))
