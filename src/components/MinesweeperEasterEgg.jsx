import { useEffect, useMemo, useState } from "react";
import "./MinesweeperEasterEgg.css";

const GRID_SIZE = 8;
const MINES_COUNT = 10;
const EMPTY_ADJACENT = 0;

const createCell = (index) => ({
	index,
	isMine: false,
	isRevealed: false,
	isFlagged: false,
	adjacent: 0,
});

const createEmptyBoard = () => Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => createCell(index));

const getNeighbors = (index) => {
	const row = Math.floor(index / GRID_SIZE);
	const col = index % GRID_SIZE;
	const neighbors = [];

	for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
		for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
			if (rowOffset === 0 && colOffset === 0) {
				continue;
			}

			const nextRow = row + rowOffset;
			const nextCol = col + colOffset;
			if (nextRow < 0 || nextRow >= GRID_SIZE || nextCol < 0 || nextCol >= GRID_SIZE) {
				continue;
			}

			neighbors.push(nextRow * GRID_SIZE + nextCol);
		}
	}

	return neighbors;
};

const plantMines = (board, safeIndex) => {
	const nextBoard = board.map((cell) => ({ ...cell }));
	const minePositions = new Set();

	while (minePositions.size < MINES_COUNT) {
		const randomIndex = Math.floor(Math.random() * nextBoard.length);
		if (randomIndex === safeIndex) {
			continue;
		}
		minePositions.add(randomIndex);
	}

	minePositions.forEach((mineIndex) => {
		nextBoard[mineIndex].isMine = true;
	});

	nextBoard.forEach((cell, index) => {
		if (cell.isMine) {
			return;
		}
		const adjacentMines = getNeighbors(index).filter((neighborIndex) => nextBoard[neighborIndex].isMine).length;
		cell.adjacent = adjacentMines;
	});

	return nextBoard;
};

const revealSafeArea = (board, startIndex) => {
	const nextBoard = board.map((cell) => ({ ...cell }));
	const queue = [startIndex];

	while (queue.length > 0) {
		const currentIndex = queue.shift();
		const currentCell = nextBoard[currentIndex];

		if (!currentCell || currentCell.isRevealed || currentCell.isFlagged) {
			continue;
		}

		currentCell.isRevealed = true;
		if (currentCell.adjacent !== EMPTY_ADJACENT) {
			continue;
		}

		getNeighbors(currentIndex).forEach((neighborIndex) => {
			const neighbor = nextBoard[neighborIndex];
			if (!neighbor.isRevealed && !neighbor.isMine) {
				queue.push(neighborIndex);
			}
		});
	}

	return nextBoard;
};

const revealAllMines = (board) =>
	board.map((cell) => {
		if (!cell.isMine) {
			return cell;
		}
		return { ...cell, isRevealed: true };
	});

const isWinBoard = (board) => board.every((cell) => cell.isMine || cell.isRevealed);

const MinesweeperEasterEgg = ({ isOpen, onClose }) => {
	const [board, setBoard] = useState(() => createEmptyBoard());
	const [started, setStarted] = useState(false);
	const [status, setStatus] = useState("ready");
	const [flagMode, setFlagMode] = useState(false);

	useEffect(() => {
		if (!isOpen) {
			return undefined;
		}

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		const handleEscape = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	const resetGame = () => {
		setBoard(createEmptyBoard());
		setStarted(false);
		setStatus("ready");
		setFlagMode(false);
	};

	const flagsCount = useMemo(() => board.filter((cell) => cell.isFlagged).length, [board]);
	const minesLeft = MINES_COUNT - flagsCount;

	const handleCellClick = (index) => {
		if (flagMode) {
			toggleFlag(null, index);
		} else {
			revealCell(index);
		}
	};

	const revealCell = (index) => {
		if (status === "lost" || status === "won") {
			return;
		}

		setBoard((currentBoard) => {
			let nextBoard = currentBoard.map((cell) => ({ ...cell }));
			const currentCell = nextBoard[index];

			if (!currentCell || currentCell.isRevealed || currentCell.isFlagged) {
				return currentBoard;
			}

			if (!started) {
				nextBoard = plantMines(nextBoard, index);
				setStarted(true);
			}

			const targetCell = nextBoard[index];
			if (targetCell.isMine) {
				setStatus("lost");
				return revealAllMines(nextBoard);
			}

			nextBoard = revealSafeArea(nextBoard, index);
			if (isWinBoard(nextBoard)) {
				setStatus("won");
			}

			return nextBoard;
		});
	};

	const toggleFlag = (event, index) => {
		if (event) {
			event.preventDefault();
		}
		if (status === "lost" || status === "won") {
			return;
		}

		setBoard((currentBoard) => {
			const nextBoard = currentBoard.map((cell) => ({ ...cell }));
			const currentCell = nextBoard[index];
			if (!currentCell || currentCell.isRevealed) {
				return currentBoard;
			}
			currentCell.isFlagged = !currentCell.isFlagged;
			return nextBoard;
		});
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className="minesweeper-overlay"
			role="dialog"
			aria-modal="true"
			aria-label="Mini-jeu démineur easter egg"
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}>
			<div className="minesweeper-card">
				<div className="minesweeper-header">
					<div>
						<p className="minesweeper-label">Easter egg débloqué 🎉</p>
						<h2>Démineur Sympatoche</h2>
					</div>
					<button className="minesweeper-close" onClick={onClose} aria-label="Fermer le démineur">
						×
					</button>
				</div>

				<div className="minesweeper-rules">
					<p className="minesweeper-rules-title">📋 Règles</p>
					<ul className="minesweeper-rules-list">
						<li>Clique sur une case pour la révéler</li>
						<li>Les chiffres indiquent les mines adjacentes</li>
						<li>Ajoute un drapeau pour marquer les mines</li>
						<li>Révèle toutes les cases sûres pour gagner</li>
					</ul>
				</div>

				<div className="minesweeper-controls">
					<button type="button" className={`minesweeper-mode-btn ${flagMode ? "active" : ""}`} onClick={() => setFlagMode(!flagMode)} aria-pressed={flagMode}>
						{flagMode ? "🚩 Mode Drapeau" : "👆 Mode Révéler"}
					</button>
				</div>

				<div className="minesweeper-stats" aria-live="polite">
					<span>Mines: {MINES_COUNT}</span>
					<span>Drapeaux: {flagsCount}</span>
					<span>Restantes: {minesLeft}</span>
				</div>

				<div className="minesweeper-grid" role="grid" aria-label="Grille démineur 8 par 8">
					{board.map((cell) => {
						const cellClasses = ["minesweeper-cell"];
						if (cell.isRevealed) {
							cellClasses.push("is-revealed");
						}
						if (cell.isMine && cell.isRevealed) {
							cellClasses.push("is-mine");
						}

						let content = "";
						if (cell.isFlagged && !cell.isRevealed) {
							content = "🚩";
						} else if (cell.isRevealed && cell.isMine) {
							content = "💣";
						} else if (cell.isRevealed && cell.adjacent > 0) {
							content = cell.adjacent;
						}

						return (
							<button
								key={cell.index}
								type="button"
								className={cellClasses.join(" ")}
								onClick={() => handleCellClick(cell.index)}
								onContextMenu={(event) => {
									event.preventDefault();
									toggleFlag(null, cell.index);
								}}
								aria-label={`Case ${cell.index + 1}`}
								role="gridcell">
								{content}
							</button>
						);
					})}
				</div>

				<div className="minesweeper-footer">
					<p className={`minesweeper-status status-${status}`}>
						{status === "ready" && "Tape sur une case pour commencer."}
						{status === "lost" && "Boom 💥 Tu as cliqué sur une mine."}
						{status === "won" && "Bravo 👑 Tu as désamorcé tout le terrain."}
					</p>
					<div className="minesweeper-actions">
						<button type="button" className="minesweeper-btn" onClick={resetGame}>
							Rejouer
						</button>
						<button type="button" className="minesweeper-btn ghost" onClick={onClose}>
							Fermer
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MinesweeperEasterEgg;
