import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import { calculate } from "../api/provider";
import { useUser } from "../context/UserContext";
import { logout } from "../api/auth";
import { useNavigate } from "@remix-run/react";

export default function Calculator() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [openBracketCount, setOpenBracketCount] = useState(0);
  const inputRef = useRef(null);

  const { user, setUser } = useUser();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);
  const handleInput = (value: string) => {
    setInput((input) => input + value);
  };

  const calculateResult = async () => {
    try {
      const result = await calculate(input);
      setInput(result.result);
    } catch (error) {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
    setOpenBracketCount(0);
  };

  const handleBack = () => {
    if (input.length === 0) return;
    const lastLetter = input.charAt(input.length - 1);
    setInput(input.substring(0, input.length - 1));
    if (lastLetter === "(") {
      setOpenBracketCount((openBracketCount) => openBracketCount - 1);
    }
    if (lastLetter === ")") {
      setOpenBracketCount((openBracketCount) => openBracketCount + 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    let openBracket = 0;
    for (const char of event.target.value) {
      if (char === "(") {
        openBracket++;
      }
      if (char === ")") {
        openBracket--;
      }
    }
    setOpenBracketCount(openBracket);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-full p-4 bg-gray-200">
        <div className="flex justify-evenly items-center">
          <span>
            {user
              ? `Logged in as ${user.name !== "" ? user.name : user.email}`
              : "Not logged in"}
          </span>
          <span>
            <h1 className="bg-gray-500 p-4 text-center">
              {user
              ? `Hii, ${user.name !== "" ? user.name : user.email}. You can do a normal calculation. Let's play with number.`
              : "Not Logged in! Please logged in first."}
            </h1>
          </span>
          <button
            onClick={() =>
              logout().then(() => {
                setUser(null);
                navigate("../login");
              })
            }
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-64 border p-2 mt-4">
        <h1 style={{ gridColumn: "1 / -1", textAlign: "center" }}>
          Calculator
        </h1>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e)}
          className="w-60 border rounded-full my-2 px-2"
          style={{ fontSize: "1.5rem" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              calculateResult();
            }
          }}
        />
        <div className="flex gap-2">
          <Button
            onClick={() => {
              clearInput();
              inputRef.current?.focus();
            }}
          >
            AC
          </Button>
          <Button
            onClick={() => {
              if (openBracketCount === 0) {
                handleInput("(");
                setOpenBracketCount((openBracketCount) => openBracketCount + 1);
              } else {
                setOpenBracketCount((openBracketCount) => openBracketCount - 1);
                handleInput(")");
              }
              inputRef.current.focus();
            }}
          >
            ()
          </Button>
          <Button
            onClick={() => {
              handleInput("/");
              inputRef.current.focus();
            }}
          >
            /
          </Button>
          <Button
            onClick={() => {
              handleInput(".");
              inputRef.current.focus();
            }}
          >
            .
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              handleInput("7");
              inputRef.current.focus();
            }}
          >
            7
          </Button>
          <Button
            onClick={() => {
              handleInput("8");
              inputRef.current.focus();
            }}
          >
            8
          </Button>
          <Button
            onClick={() => {
              handleInput("9");
              inputRef.current.focus();
            }}
          >
            9
          </Button>
          <Button
            onClick={() => {
              handleInput("*");
              inputRef.current.focus();
            }}
          >
            *
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              handleInput("4");
              inputRef.current.focus();
            }}
          >
            4
          </Button>
          <Button
            onClick={() => {
              handleInput("5");
              inputRef.current.focus();
            }}
          >
            5
          </Button>
          <Button
            onClick={() => {
              handleInput("6");
              inputRef.current.focus();
            }}
          >
            6
          </Button>
          <Button
            onClick={() => {
              handleInput("-");
              inputRef.current.focus();
            }}
          >
            -
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              handleInput("1");
              inputRef.current.focus();
            }}
          >
            1
          </Button>
          <Button
            onClick={() => {
              handleInput("2");
              inputRef.current.focus();
            }}
          >
            2
          </Button>
          <Button
            onClick={() => {
              handleInput("3");
              inputRef.current.focus();
            }}
          >
            3
          </Button>
          <Button
            onClick={() => {
              handleInput("+");
              inputRef.current.focus();
            }}
          >
            +
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              handleInput("0");
              inputRef.current.focus();
            }}
          >
            0
          </Button>
          <Button
            onClick={() => {
              handleInput("00");
              inputRef.current.focus();
            }}
          >
            00
          </Button>
          <Button
            onClick={() => {
              handleBack();
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          >
            {"C"}
          </Button>
          <Button
            onClick={() => {
              calculateResult();
              inputRef.current.focus();
            }}
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
}
