import { ethers } from 'ethers';

const FLARE_TESTNET_RPC_URL = 'https://coston2.enosys.global/ext/C/rpc';

const CONTRACT_ADDRESS = '0xc84C08D4BAd1f43FF053ba590d990E495A64FCd8';

export function getFlareProvider() {
  const flareRpcUrl = FLARE_TESTNET_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(flareRpcUrl);
  return provider;
}

export function getContract() {
  const provider = getFlareProvider();
  const contractAddress = CONTRACT_ADDRESS;
  const contractABI = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_ticketId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: '_allowed',
          type: 'bool',
        },
      ],
      name: 'approveTicket',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_eventId',
          type: 'uint256',
        },
      ],
      name: 'buyTicket',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_name',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_description',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: '_capacity',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_ticketPrice',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_eventDate',
          type: 'uint256',
        },
        {
          internalType: 'string[]',
          name: '_images',
          type: 'string[]',
        },
      ],
      name: 'createEvent',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_ticketId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: '_to',
          type: 'address',
        },
      ],
      name: 'transferTicket',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'eventCounter',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'events',
      outputs: [
        {
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'description',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'capacity',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'ticketsSold',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'ticketPrice',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'eventDate',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'eventHost',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_eventId',
          type: 'uint256',
        },
      ],
      name: 'getEventImages',
      outputs: [
        {
          internalType: 'string[]',
          name: '',
          type: 'string[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_eventId',
          type: 'uint256',
        },
      ],
      name: 'getEventTickets',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTicketPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'ticketCounter',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'tickets',
      outputs: [
        {
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'boughtTime',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'eventId',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'userTickets',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  return new ethers.Contract(contractAddress, contractABI, provider);
}
