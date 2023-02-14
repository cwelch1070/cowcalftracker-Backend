#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <ctime>
#include <cstdlib>
#include <SFML/Graphics.hpp>

const int WIDTH = 500;
const int HEIGHT = 500;
const int RADIUS = 100;
const int THICKNESS = 5;

class TicTacToe {
public:
  TicTacToe()
    : window(sf::VideoMode(WIDTH, HEIGHT), "Tic Tac Toe"),
      turn(1), game_over(false)
  {
    circle.setRadius(RADIUS - THICKNESS);
    circle.setOutlineThickness(THICKNESS);
    circle.setOutlineColor(sf::Color::Black);
  }

  void run() {
    while (window.isOpen()) {
      process_events();
      render();
    }
  }

private:
  void process_events() {
    sf::Event event;
    while (window.pollEvent(event)) {
      switch (event.type) {
      case sf::Event::Closed:
        window.close();
        break;
      case sf::Event::MouseButtonPressed:
        if (!game_over) {
          check_board(event.mouseButton.x, event.mouseButton.y);
        }
        break;
      default:
        break;
      }
    }
  }

  void check_board(int x, int y) {
    int i = x / (WIDTH / 3);
    int j = y / (HEIGHT / 3);
    int index = i + j * 3;
    if (board[index] == 0) {
      board[index] = turn;
      turn = (turn == 1 ? 2 : 1);
    }
    check_game_over();
  }

  void check_game_over() {
    int winner = 0;
    // check rows
    for (int i = 0; i < 3; ++i) {
      if (board[i] != 0 && board[i] == board[i + 3] && board[i] == board[i + 6]) {
        winner = board[i];
      }
    }
    // check columns
    for (int i = 0; i < 3; ++i) {
      if (board[i * 3] != 0 && board[i * 3] == board[i * 3 + 1] && board[i * 3] == board[i * 3 + 2]) {
        winner = board[i * 3];
      }
    }
    // check diagonals
    if (board[0] != 0 && board[0] == board[4] && board[0] == board[8]) {
      winner = board[0];
    }
    if (board[2] != 0 && board[2] == board[4] && board[2] == board[6]) {
      winner = board[2];
    }
    if (winner !=0) {
      game_over = true;
      std::string message = "Player " + std::to_string(winner) + " wins!";
      sf::Text text(message, font, 50);
      text.setPosition(WIDTH / 2 - text.getLocalBounds().width / 2, HEIGHT / 2 - text.getLocalBounds().height / 2);
      window.draw(text);
    } else if (std::all_of(board.begin(), board.end(), [](int x){ return x != 0; })) {
      game_over = true;
      sf::Text text("Tie!", font, 50);
      text.setPosition(WIDTH / 2 - text.getLocalBounds().width / 2, HEIGHT / 2 - text.getLocalBounds().height / 2);
      window.draw(text);
    }
  }

  void render() {
    window.clear();
    for (int i = 0; i < 3; ++i) {
      for (int j = 0; j < 3; ++j) {
        int x = i * (WIDTH / 3) + (WIDTH / 6);
        int y = j * (HEIGHT / 3) + (HEIGHT / 6);
        circle.setFillColor((board[i + j * 3] == 1 ? sf::Color::Red : sf::Color::Blue));
        circle.setPosition(x - RADIUS, y - RADIUS);
        window.draw(circle);
      }
    }
    window.display();
  }

  sf::RenderWindow window;
  sf::CircleShape circle;
  sf::Font font;
  std::vector<int> board{ 0, 0, 0, 0, 0, 0, 0, 0, 0 };
  int turn;
  bool game_over;
};

int main() {
  TicTacToe game;
  game.run();
  return 0;
}

