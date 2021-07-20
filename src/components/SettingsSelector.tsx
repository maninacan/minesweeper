import React, { Fragment, useRef, useState } from "react";
import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { changeSetup, selectSetup } from "../redux/settingsSlice";
import { ALL_GAME_SETTINGS } from "../constants";
import { generateGame } from "../redux/gameSlice";
import { changeStatus, StatusEnum } from "../redux/statusSlice";

const settings = [
  ALL_GAME_SETTINGS.beginner,
  ALL_GAME_SETTINGS.intermediate,
  ALL_GAME_SETTINGS.expert,
];

const SettingsSelector = () => {
  const dispatch = useDispatch();
  const selectedSetup = useSelector(selectSetup);

  const [selected, setSelected] = useState(selectedSetup);
  const [customSetting, setCustomSetting] = useState(ALL_GAME_SETTINGS.custom);
  const buttonRef = useRef();

  // @ts-ignore
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            // @ts-ignore
            ref={buttonRef}
            className={`
                ${open ? "" : "text-opacity-90"}
                group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span>Settings</span>
            <ChevronDownIcon
              className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <RadioGroup
                  value={selected}
                  onChange={setSelected}
                  className="bg-white"
                >
                  <div className="relative bg-white rounded-md -space-y-px">
                    {settings.map((setting, selectionIndex) => (
                      <RadioGroup.Option
                        key={setting.name}
                        value={setting}
                        className={({ checked }) =>
                          classNames(
                            selectionIndex === 0
                              ? "rounded-tl-md rounded-tr-md"
                              : "",
                            checked
                              ? "bg-indigo-50 border-indigo-200 z-10"
                              : "border-gray-200",
                            "relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-4 focus:outline-none"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex items-center text-sm">
                              <span
                                className={classNames(
                                  checked
                                    ? "bg-indigo-600 border-transparent"
                                    : "bg-white border-gray-300",
                                  active
                                    ? "ring-2 ring-offset-2 ring-indigo-500"
                                    : "",
                                  "h-4 w-4 rounded-full border flex items-center justify-center"
                                )}
                                aria-hidden="true"
                              >
                                <span className="rounded-full bg-white w-1.5 h-1.5" />
                              </span>
                              <RadioGroup.Label
                                as="span"
                                className={classNames(
                                  checked ? "text-indigo-900" : "text-gray-900",
                                  "ml-3 font-medium"
                                )}
                              >
                                {setting.name}
                              </RadioGroup.Label>
                            </div>
                            <RadioGroup.Description className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
                              <span
                                className={classNames(
                                  checked ? "text-indigo-900" : "text-gray-900",
                                  "font-medium"
                                )}
                              >
                                {setting.height}
                              </span>
                            </RadioGroup.Description>
                            <RadioGroup.Description className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
                              <span
                                className={classNames(
                                  checked ? "text-indigo-900" : "text-gray-900",
                                  "font-medium"
                                )}
                              >
                                {setting.width}
                              </span>
                            </RadioGroup.Description>
                            <RadioGroup.Description className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
                              <span
                                className={classNames(
                                  checked ? "text-indigo-900" : "text-gray-900",
                                  "font-medium"
                                )}
                              >
                                {setting.mines}
                              </span>
                            </RadioGroup.Description>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                    {/*<RadioGroup.Option*/}
                    {/*  value={customSetting}*/}
                    {/*  className={({ checked }) =>*/}
                    {/*    classNames(*/}
                    {/*      "rounded-bl-md rounded-br-md",*/}
                    {/*      checked*/}
                    {/*        ? "bg-indigo-50 border-indigo-200 z-10"*/}
                    {/*        : "border-gray-200",*/}
                    {/*      "relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-4 focus:outline-none"*/}
                    {/*    )*/}
                    {/*  }*/}
                    {/*>*/}
                    {/*  {({ active, checked }) => (*/}
                    {/*    <>*/}
                    {/*      <div className="flex items-center text-sm">*/}
                    {/*        <span*/}
                    {/*          className={classNames(*/}
                    {/*            checked*/}
                    {/*              ? "bg-indigo-600 border-transparent"*/}
                    {/*              : "bg-white border-gray-300",*/}
                    {/*            active*/}
                    {/*              ? "ring-2 ring-offset-2 ring-indigo-500"*/}
                    {/*              : "",*/}
                    {/*            "h-4 w-4 rounded-full border flex items-center justify-center"*/}
                    {/*          )}*/}
                    {/*          aria-hidden="true"*/}
                    {/*        >*/}
                    {/*          <span className="rounded-full bg-white w-1.5 h-1.5" />*/}
                    {/*        </span>*/}
                    {/*        <RadioGroup.Label*/}
                    {/*          as="span"*/}
                    {/*          className={classNames(*/}
                    {/*            checked ? "text-indigo-900" : "text-gray-900",*/}
                    {/*            "ml-3 font-medium"*/}
                    {/*          )}*/}
                    {/*        >*/}
                    {/*          Custom*/}
                    {/*        </RadioGroup.Label>*/}
                    {/*      </div>*/}
                    {/*    </>*/}
                    {/*  )}*/}
                    {/*</RadioGroup.Option>*/}
                  </div>
                </RadioGroup>
                {selected.name === "Custom" && (
                  <form className="flex justify-between">
                    <input
                      id="height"
                      name="height"
                      type="number"
                      placeholder="height"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) =>
                        setCustomSetting({
                          ...customSetting,
                          height: parseInt(e.target.value),
                        })
                      }
                    />
                    <input
                      id="width"
                      name="width"
                      type="number"
                      placeholder="width"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) =>
                        setCustomSetting({
                          ...customSetting,
                          width: parseInt(e.target.value),
                        })
                      }
                    />
                    <input
                      id="mines"
                      name="mines"
                      type="number"
                      placeholder="mines"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) =>
                        setCustomSetting({
                          ...customSetting,
                          mines: parseInt(e.target.value),
                        })
                      }
                    />
                  </form>
                )}
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    const gameSettings = {
                      name: selected.name,
                      height: selected.height,
                      width: selected.width,
                      mines: selected.mines,
                    };
                    dispatch(changeSetup(gameSettings));
                    dispatch(generateGame({ gameSettings }));
                    dispatch(changeStatus(StatusEnum.setup));
                    // @ts-ignore
                    buttonRef.current?.click();
                  }}
                >
                  New Game
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default SettingsSelector;
